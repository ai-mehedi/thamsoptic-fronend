"use client";

import { AdminLayout } from "@/components/admin-layout";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePackagePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    downloadSpeed: "",
    uploadSpeed: "",
    price: "",
    offerPrice: "",
    status: "active",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          downloadSpeed: parseFloat(formData.downloadSpeed),
          uploadSpeed: parseFloat(formData.uploadSpeed),
          price: parseFloat(formData.price),
          offerPrice: parseFloat(formData.offerPrice),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create package");
      }

      router.push("/admin/packages");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl  bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Create New Package</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded-md"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">
                Download Speed (Mbps)
              </label>
              <input
                type="number"
                name="downloadSpeed"
                value={formData.downloadSpeed}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">
                Upload Speed (Mbps)
              </label>
              <input
                type="number"
                name="uploadSpeed"
                value={formData.uploadSpeed}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Price (৳)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Offer Price (৳)</label>
              <input
                type="number"
                name="offerPrice"
                value={formData.offerPrice}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              {loading ? "Submitting..." : "Create Package"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
