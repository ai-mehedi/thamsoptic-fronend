// app/api/postcode/[code]/route.ts
import { NextRequest } from "next/server";
import https from "https";
import fs from "fs";
import path from "path";
import axios from "axios";
import xml2js from "xml2js";

export async function GET(req: NextRequest, { params }: { params: { code: string } }) {
    const postcode = params.code;

    const xmldata = `<?xml version="1.0" encoding="UTF-8"?>
  <SOAP-ENV:Envelope xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <SOAP-ENV:Body>
      <open:addressSearch xmlns:open="http://www.openuri.org/">
        <gen:GenericCPWSHubService xmlns:gen="http://www.bt.com/eai/hub/or/GenericCPWSHubService">
          <AddAddressSearchQuery xmlns="urn:com.openreach.AddressSearchv44-0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="urn:com.openreach.AddressSearchv44-0 ..\\..\\Schemas\\Application\\AddressSearchv44-0.xsd">
            <Query>
              <RequestersID>1</RequestersID>
              <IssueDateTime>${new Date().toISOString()}</IssueDateTime>
              <RequesterParty>
                <Party>
                  <PartyIdentification>
                    <ID identificationSchemeAgencyName="DUNS">218578231</ID>
                  </PartyIdentification>
                </Party>
              </RequesterParty>
              <ResponderParty>
                <Party>
                  <PartyIdentification>
                    <ID identificationSchemeName="DUNS">218578231</ID>
                  </PartyIdentification>
                </Party>
              </ResponderParty>
              <QueryLine>
                <QueryLineItem>
                  <RequestersID>1</RequestersID>
                  <Features>
                    <AddressFeatureSet>
                      <InputFeatures>
                        <Site>
                          <SearchUPRN><RefNum>null</RefNum></SearchUPRN>
                          <SiteSearchCode>null</SiteSearchCode>
                          <Address>
                            <BritishAddress>
                              <PostCode>${postcode}</PostCode>
                              <OrganisationName>null</OrganisationName>
                              <POBox>null</POBox>
                              <SubPremises>null</SubPremises>
                              <PremisesName>null</PremisesName>
                              <ThoroughfareNumber>null</ThoroughfareNumber>
                              <DependentThoroughfareName>null</DependentThoroughfareName>
                              <ThoroughfareName>null</ThoroughfareName>
                              <DoubleDependentLocality>null</DoubleDependentLocality>
                              <Locality>null</Locality>
                              <PostTown>null</PostTown>
                              <County>null</County>
                              <Country>null</Country>
                            </BritishAddress>
                          </Address>
                          <Coordinates>
                            <Coordinate><Easting>null</Easting><Northing>null</Northing></Coordinate>
                            <Coordinate><Latitude>null</Latitude><Longitude>null</Longitude></Coordinate>
                          </Coordinates>
                        </Site>
                        <Radius>10</Radius>
                        <UnresolvedNonPostalAddress>null</UnresolvedNonPostalAddress>
                        <BTExchangeAddress>null</BTExchangeAddress>
                      </InputFeatures>
                    </AddressFeatureSet>
                  </Features>
                </QueryLineItem>
              </QueryLine>
            </Query>
          </AddAddressSearchQuery>
        </gen:GenericCPWSHubService>
      </open:addressSearch>
    </SOAP-ENV:Body>
  </SOAP-ENV:Envelope>`;

    try {
        const cert = fs.readFileSync(path.join(process.cwd(), "lib/api.crt.pem"));
        const key = fs.readFileSync(path.join(process.cwd(), "lib/api.key.pem"));

        const httpsAgent = new https.Agent({
            cert,
            key,
            rejectUnauthorized: false,
        });

        const response = await axios.post(
            "https://www.ws.openreach.co.uk:9443/emp/4400/AddressMatching",
            xmldata,
            {
                httpsAgent,
                headers: {
                    "Content-Type": "text/xml",
                },
            }
        );

        const parser = new xml2js.Parser({ explicitArray: false, ignoreAttrs: false });

        const parsed = await parser.parseStringPromise(response.data);

        const siteList =
            parsed?.["soapenv:Envelope"]?.["SOAP-ENV:Body"]?.["ns:addressSearchResponse"]
            ?.["ns2:GenericCPWSHubService"]?.["ns1:AddressSearchQueryAccepted"]
            ?.["ns1:QueryResponse"]?.["ns1:RespondedQueryLine"]
            ?.["ns1:QueryLineItem"]?.["ns1:Features"]
            ?.["ns1:AddressFeatureSet"]?.["ns1:OutputFeatures"]
            ?.["ns1:ListOfSite"]?.["ns1:Site"];

        const sites = Array.isArray(siteList) ? siteList : [siteList];

        const formatted = sites.map((site: any) => {
            const address = site["ns1:Address"]?.["ns1:BritishAddress"] || {};
            const techList =
                site["ns1:Address"]?.["ns1:AddressReference"]?.["ns1:ListOfTechnology"]?.["ns1:Technology"] || [];

            return {
                RefNum: site["ns1:Address"]?.["ns1:AddressReference"]?.["ns1:RefNum"] || null,
                DistrictCode: site["ns1:Address"]?.["ns1:AddressReference"]?.["ns1:DistrictCode"] || null,
                uprn: site["ns1:UPRN"]?.["ns1:RefNum"] || null,
                organisation: address["ns1:OrganisationName"] || null,
                subPremises: address["ns1:PremisesName"] || null,
                thoroughfare: `${address["ns1:ThoroughfareNumber"] || ""} ${address["ns1:ThoroughfareName"] || ""}`.trim(),
                town: address["ns1:PostTown"] || null,
                postcode: address["ns1:PostCode"] || null,
                country: address["ns1:Country"] || null,
                technologies: Array.isArray(techList)
                    ? techList.map((tech: any) => ({
                        name: tech["ns1:TechnologyName"],
                        available: tech["ns1:TechnologyValue"] === "Y",
                    }))
                    : [],
            };
        });

        return new Response(JSON.stringify({ data: formatted }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*", // For development only; remove in prod
            },
        });
    } catch (error: any) {
        console.error("API Error:", error.message);
        return new Response(JSON.stringify({ error: "Failed to process request" }), {
            status: 500,
        });
    }
}
