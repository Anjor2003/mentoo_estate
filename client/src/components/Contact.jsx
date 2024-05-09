import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);
  return (
    <>
      <div className="flex flex-col gap-2">
        <p>
          Contacto <span className="font-semibold">{landlord?.userName}</span>{" "}
          para {" "}
          <span className="font-semibold truncate uppercase">{listing.name.toLowerCase()}</span>
        </p>
        <textarea
          name="message"
          id="message"
          rows="2"
          value={message}
          onChange={onChange}
          placeholder="Escriba un mensaje..."
          className="w-full rounded-lg border-slate-300 shadow-sm p-3  focus:outline-none"
        ></textarea>
        <Link
        to={`mailto:${landlord?.email}?subject=Acerca de ${listing.name}&body=${message}`}
        className="bg-slate-700 text-white rounded-lg px-3 py-2 mt-3 hover:bg-white hover:text-slate-700 hover:outline text-center uppercase"
        >Enviar mensaje</Link>
      </div>
    </>
  );
}
