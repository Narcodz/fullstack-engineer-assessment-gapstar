import { useEffect, useState } from "react";
import "./App.css";
import { Company } from "./interface/Company";
import { getItems } from "./service/itemService";
import NoImage from "../../client/public/No-Image-Placeholder.svg";

// To handle image errors
const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>
) => {
  event.currentTarget.src = NoImage;
};

function App() {
  const [groupedCompanies, setGroupedCompanies] = useState<
    Record<string, Company[]>
  >({});

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companiesData: Company[] = await getItems();
        const grouped = companiesData.reduce((acc, company) => {
          let industry = company.industries[0]?.name || "Other";

          industry = industry.replace(/\b\w/g, (char) => char.toUpperCase());

          if (!acc[industry]) acc[industry] = [];
          if (!acc[industry].some((c) => c.uuid === company.uuid)) {
            acc[industry].push(company);
          }
          return acc;
        }, {} as Record<string, Company[]>);

        // Sort companies alphabetically within each industry
        for (const industry in grouped) {
          grouped[industry] = grouped[industry].sort((a, b) =>
            a.name.localeCompare(b.name)
          );
        }

        setGroupedCompanies(grouped);
      } catch (error) {
        console.error("Failed to fetch companies data:", error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 py-3 text-center border-b text-black-font">
        Companies by Industry
      </h1>

      <div className="flex flex-wrap justify-between gap-6 text-black-font">
        {Object.entries(groupedCompanies).map(([industry, companies]) => (
          <div
            key={industry}
            className="w-[300px] border rounded-md p-6 shadow hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center mb-4 text-md-custom">
              <h2 className="text-black-font">{industry}</h2>
              <span className=" text-gray-font">{companies.length}</span>
            </div>
            <div className="border-b pb-2 mb-4">
              <div className="flex justify-between text-xs-custom font-normal-weight text-gray-font">
                <span>Name</span>
                <span>Total Jobs Available</span>
              </div>
            </div>
            <ul className="list-none">
              {companies.map((company, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-4 w-full">
                    <img
                      src={company.images["32x32"] || NoImage}
                      className="w-10 h-10 object-contain"
                      alt={company.name}
                      onError={handleImageError}
                    />
                    <h3 className="text-sm text-black-font text-left w-full">
                      {company.name}
                    </h3>
                  </div>
                  <span className="text-sm-custom leading-line-20 font-normal-weight text-gray-font">
                    {company.total_jobs_available}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
