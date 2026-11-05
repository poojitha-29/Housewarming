import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { EventProvider } from "./context/EventContext";
import WishlysFrontDoor from "./components/WishlysFrontDoor";
import WishlysMainSite from "./components/WishlysMainSite";
import AdminPanel from "./components/AdminPanel";

export default function App() {
  // Always start with false so on every open or refresh, visitor sees Screenshot 1 & 2
  const [doorOpened, setDoorOpened] = useState(false);

  const handleDoorOpen = () => {
    setDoorOpened(true);
  };

  const handleReplayEntrance = () => {
    setDoorOpened(false);
  };

  return (
    <EventProvider>
      <div className="min-h-screen bg-[#F5EFEB] text-[#1C1917] selection:bg-[#E0A458] selection:text-white relative">
        <AnimatePresence mode="wait">
          {!doorOpened ? (
            <WishlysFrontDoor
              key="wishlys-front-door"
              onOpen={handleDoorOpen}
            />
          ) : (
            <WishlysMainSite
              key="wishlys-main-site"
              onReplayEntrance={handleReplayEntrance}
            />
          )}
        </AnimatePresence>

        {/* Global Floating Admin Panel for Customizing All Invitation Details */}
        <AdminPanel />
      </div>
    </EventProvider>
  );
}

