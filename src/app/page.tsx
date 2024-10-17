import Image from 'next/image';
import { TokenGate } from '@/components/TokenGate';
import { getSession } from '@/utils/session';

/**
 * The revalidate property determine's the cache TTL for this page and
 * all fetches that occur within it. This value is in seconds.
 */
export const revalidate = 180;

async function Content({ searchParams }: { searchParams: SearchParams }) {
  const data = await getSession(searchParams);
  // Console log the data to see what's available
  // You can see these logs in the terminal where
  // you run `yarn dev`
  console.log("HELLO FROM THE IFRAME!");
  console.log({ data });
  console.log({ searchParams });

  // Dummy data as per the image (this should come from your API or session data)
  const ongoingBids = [
    { 
      title: "Riksrevisionen",
      answered: 1, totalQuestions: 5, deadline: "2024-10-15", 
      status: "Obligatorisk", progress: 20
    },
    { 
      title: "Hebygårdar",
      answered: 5, totalQuestions: 5, deadline: "2024-10-21", 
      status: "Genomförd", progress: 100
    },
  ];

  const unansweredTenders = [
    { 
      title: "Stockholms Stad (Västerort)",
      value: "0.3 MSEK/år", location: "Stockholm", 
      deadline: "2024-10-18", area: "40 m²", tags: ["Trappor", "Skola", "Kontor"]
    },
    { 
      title: "Linköpings kommun (Ånestadsskolan)",
      value: "2.5 MSEK/år", location: "Östergötland", 
      deadline: "2024-10-18", area: "10k m²", tags: ["Idrottshall", "Skola"]
    },
    { 
      title: "Svenska Institutet (FM-tjänster)",
      value: "1.9 MSEK/år", location: "Stockholm", 
      deadline: "2024-11-01", area: "1.9k m²", tags: ["Kontor"]
    },
    { 
      title: "Norrköpings kommun",
      value: "4 MSEK/år", location: "Östergötland", 
      deadline: "2024-11-04", area: "27k m²", tags: ["Idrottshall", "Skola"]
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Ongoing Bids Section */}
      <div className="max-w-5xl w-full">
        <h2 className="text-2xl font-bold">Pågående Anbud</h2>
        <div className="space-y-4 mt-4">
          {ongoingBids.map((bid, idx) => (
            <div key={idx} className="p-4 border rounded-lg shadow">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{bid.title}</h3>
                <button className="bg-blue-500 text-white p-2 rounded">Prisanalys</button>
              </div>
              <div className="text-gray-500">{bid.status}</div>
              <div className="flex justify-between items-center mt-2">
                <p>Deadline: {bid.deadline}</p>
                <p>{bid.answered}/{bid.totalQuestions} Frågor Besvarade</p>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${bid.progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Unanswered Tenders Section */}
      <div className="max-w-5xl w-full mt-8">
        <h2 className="text-2xl font-bold">Upphandlingar: Ej Besvarade</h2>
        <div className="space-y-4 mt-4">
          {unansweredTenders.map((tender, idx) => (
            <div key={idx} className="p-4 border rounded-lg shadow">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{tender.title}</h3>
                <p>{tender.value}</p>
              </div>
              <div className="text-gray-500">{tender.location}</div>
              <div className="flex justify-between items-center mt-2">
                <p>Deadline: {tender.deadline}</p>
                <p>Area: {tender.area}</p>
              </div>
              <div className="flex space-x-2 mt-2">
                {tender.tags.map((tag, tagIdx) => (
                  <span key={tagIdx} className="bg-gray-200 text-gray-800 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <button className="mt-2 bg-gray-300 text-gray-800 p-2 rounded">Sammanfattning</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return (
    <TokenGate searchParams={searchParams}>
      <Content searchParams={searchParams} />
    </TokenGate>
  );
}
