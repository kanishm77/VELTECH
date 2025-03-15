"use client";
import React, { useEffect, useState } from "react";

function MainComponent() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [selectedService, setSelectedService] = useState("dhcp");
  const [pfSenseIP, setPfSenseIP] = useState("");
  const [showDocs, setShowDocs] = useState(false);
  const fetchPfSenseIP = async () => {
    try {
      const response = await fetch("/api/get-ip");
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setPfSenseIP(data.pfSense_IP);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchPfSenseIP();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3")',
          filter: "brightness(0.3)",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block p-4 rounded-full bg-[#1a1a1a]/70 backdrop-blur-lg mb-4">
              <i className="fas fa-microchip text-5xl text-[#00ffff]"></i>
            </div>
            <h1 className="text-5xl font-bold text-[#00ffff] font-roboto mb-4">
              VEL
            </h1>
            <p className="text-xl text-[#80ffff] font-roboto">
              Virtualized Environment Laboratory - Your Gateway to Advanced
              <br />
              Infrastructure Management
            </p>
          </div>

          <div className="bg-[#1a1a1a]/90 backdrop-blur-xl rounded-xl p-8 shadow-2xl border border-[#2a2a2a]">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-white font-roboto">
                VM Control Panel
              </h1>
              <button
                onClick={() => setShowDocs(!showDocs)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200"
              >
                <i className="fas fa-book mr-2"></i>
                Docs
              </button>
            </div>

            {showDocs && (
              <div className="mb-6 p-4 bg-[#3a3a3a] rounded-lg text-white">
                <h3 className="font-bold mb-2 text-[#00ffff]">
                  How to Access Your Service
                </h3>
                <div className="space-y-4">
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Use the pfSense IP address shown below</li>
                    <li>
                      Connect using the corresponding port number for your
                      selected service
                    </li>
                  </ol>
                  <div className="mt-4 p-3 bg-[#2a2a2a] rounded-lg">
                    <p className="text-[#80ffff] font-mono">
                      Example: http://&lt;pfSense IP&gt;:1009 for DNS
                    </p>
                  </div>
                  <div className="mt-4 border-t border-[#4a4a4a] pt-4">
                    <h4 className="font-bold mb-2 text-[#00ffff]">
                      Service Ports
                    </h4>
                    <ul className="space-y-2">
                      <li>• DNS: Port 1009</li>
                      <li>• DHCP: Port 1010</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-[#00ffff] mb-2 font-roboto">
                  Select Infrastructure Service
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full bg-[#2a2a2a] text-[#00ffff] rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#00ffff] mb-6 border border-[#3a3a3a]"
                  name="service"
                >
                  <option value="dhcp">DHCP Service</option>
                  <option value="dns">DNS Service</option>
                </select>
              </div>
              <div className="flex justify-center space-x-6">
                <a
                  href={`/path/to/${selectedService}/terraform/apply`}
                  className="w-[200px] bg-gradient-to-r from-[#00cccc] to-[#007777] hover:from-[#00ffff] hover:to-[#009999] text-white font-bold py-3 px-4 rounded-lg transition duration-200 text-center flex items-center justify-center group"
                >
                  <div className="bg-[#00ffff]/20 p-2 rounded-full mr-3 group-hover:bg-[#00ffff]/30">
                    <i className="fas fa-rocket text-lg"></i>
                  </div>
                  Launch
                </a>
                <a
                  href={`/path/to/${selectedService}/terraform/destroy`}
                  className="w-[200px] bg-gradient-to-r from-[#cc0000] to-[#770000] hover:from-[#ff0000] hover:to-[#990000] text-white font-bold py-3 px-4 rounded-lg transition duration-200 text-center flex items-center justify-center group"
                >
                  <div className="bg-[#ff0000]/20 p-2 rounded-full mr-3 group-hover:bg-[#ff0000]/30">
                    <i className="fas fa-trash-alt text-lg"></i>
                  </div>
                  Destroy
                </a>
              </div>

              {loading && (
                <div className="text-center text-blue-400">
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Processing...
                </div>
              )}

              {message && (
                <div className="bg-green-600/20 text-green-400 p-4 rounded-lg">
                  <i className="fas fa-check-circle mr-2"></i>
                  {message}
                </div>
              )}

              {error && (
                <div className="bg-red-600/20 text-red-400 p-4 rounded-lg">
                  <i className="fas fa-exclamation-circle mr-2"></i>
                  {error}
                </div>
              )}

              {pfSenseIP && (
                <div className="mt-6 p-4 bg-[#3a3a3a] rounded-lg">
                  <h2 className="text-white font-roboto mb-2">
                    pfSense IP Address:
                  </h2>
                  <p className="text-blue-400 font-mono">{pfSenseIP}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;