/* eslint-disable @typescript-eslint/no-explicit-any */
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

interface PostMediaModalProps {
  documents: any;
  isLoading: boolean;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleCloseModal: () => void;
}

const PostMediaModal = ({
  documents,
  isLoading,
  isModalOpen,
  setIsModalOpen,
  handleCloseModal,
}: PostMediaModalProps) => {
  const [playingStates, setPlayingStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const swiperRef = useRef<any>(null);

  const toggleVideoPlay = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = videoRefs.current[id];
    if (video) {
      if (playingStates[id]) {
        video.pause();
      } else {
        video.play();
      }
      setPlayingStates((prev) => ({ ...prev, [id]: !prev[id] }));
    }
  };

  useEffect(() => {
    // Cleanup function to pause videos when component unmounts
    return () => {
      Object.values(videoRefs.current).forEach((video) => {
        if (video) {
          video.pause();
        }
      });
    };
  }, []);

  // Pause video when sliding away
  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
    // Pause all videos
    Object.keys(videoRefs.current).forEach((id) => {
      const video = videoRefs.current[id];
      if (video && playingStates[id]) {
        video.pause();
        setPlayingStates((prev) => ({ ...prev, [id]: false }));
      }
    });
  };

  return (
    <div
      className={`${
        isModalOpen ? "visible" : "invisible"
      } w-full h-screen fixed top-0 left-0 z-[200000000] bg-black/80 backdrop-blur-md flex items-center justify-center font-Nunito transition-all duration-500`}
      onClick={() => setIsModalOpen(false)}
    >
      <div
        className={`${
          isModalOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        } w-[95%] lg:w-[85%] xl:w-[75%] 2xl:w-[30%] h-fit max-h-[90vh] overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl transition-all duration-300 relative border border-gray-700`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between w-full px-6 py-4 border-b border-gray-700">
          <h1 className="text-lg md:text-xl font-semibold text-white flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            Media Gallery
            {documents.length > 0 && (
              <span className="text-sm font-normal text-gray-400 ml-2">
                {activeIndex + 1} of {documents.length}
              </span>
            )}
          </h1>
          <button
            onClick={handleCloseModal}
            className="text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-full p-2 transition-all duration-200 cursor-pointer"
          >
            <RxCross1 className="text-lg" />
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-96 bg-gray-900">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="h-3 w-3 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        ) : !documents.length ? (
          <div className="flex flex-col items-center justify-center h-96 bg-gray-900">
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl">📷</span>
            </div>
            <p className="text-gray-400 text-lg">No media found</p>
            <p className="text-gray-600 text-sm mt-2">
              Upload some images or videos to see them here
            </p>
          </div>
        ) : (
          <div className="relative w-full bg-gray-900">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={handleSlideChange}
              pagination={{
                clickable: true,
                dynamicBullets: true,
                bulletClass: "swiper-pagination-bullet custom-swiper-bullet",
                bulletActiveClass: "custom-swiper-bullet-active",
              }}
              autoplay={
                documents.length > 1
                  ? {
                      delay: 5000,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }
                  : false
              }
              loop={documents.length > 1}
              className="rounded-lg"
            >
              {documents?.map((doc: any) => (
                <SwiperSlide key={doc.id}>
                  <div className="relative bg-black flex items-center justify-center h-[60vh] min-h-[500px] max-h-[70vh]">
                    {doc.type === "IMAGE" ? (
                      <img
                        src={doc.url}
                        alt={`Media ${doc.id}`}
                        className="max-w-full max-h-full object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <div className="relative w-full h-full flex items-center justify-center group">
                        <video
                          ref={(el) => {
                            if (el) videoRefs.current[doc.id] = el;
                          }}
                          src={doc.url}
                          className="max-w-full max-h-full object-contain"
                          loop
                          playsInline
                          onClick={(e) => toggleVideoPlay(doc.id, e)}
                        />

                        {/* Centered Play/Pause Button */}
                        <button
                          onClick={(e) => toggleVideoPlay(doc.id, e)}
                          className="absolute inset-0 m-auto w-20 h-20 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-2xl border-4 border-white/30 group-hover:bg-blue-700 z-20 cursor-pointer"
                          aria-label={playingStates[doc.id] ? "Pause" : "Play"}
                        >
                          {playingStates[doc.id] ? (
                            <Pause className="w-10 h-10" />
                          ) : (
                            <Play className="w-10 h-10 ml-1" />
                          )}
                        </button>

                        {/* Video Progress Indicator (optional) */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm z-10">
                          {playingStates[doc.id] ? "Playing" : "Paused"}
                        </div>
                      </div>
                    )}

                    {/* Media type indicator with icon */}
                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium z-30 border border-white/20 shadow-lg flex items-center gap-2">
                      {doc.type === "IMAGE" ? (
                        <>
                          <span className="text-lg">📷</span>
                          <span>Image</span>
                        </>
                      ) : (
                        <>
                          <span className="text-lg">🎥</span>
                          <span>Video</span>
                        </>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            {documents.length > 1 && (
              <>
                <button
                  onClick={() => swiperRef.current?.slidePrev()}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-40 bg-black/70 hover:bg-blue-600 text-white rounded-full p-3 transition-all duration-200 backdrop-blur-sm border border-white/20 shadow-lg hover:scale-110 hidden sm:block cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => swiperRef.current?.slideNext()}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-40 bg-black/70 hover:bg-blue-600 text-white rounded-full p-3 transition-all duration-200 backdrop-blur-sm border border-white/20 shadow-lg hover:scale-110 hidden sm:block cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Bottom gradient for better text visibility */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
          </div>
        )}
      </div>

      {/* Add custom styles for pagination bullets */}
      <style>{`
        .custom-swiper-bullet {
          background: rgba(255, 255, 255, 0.5) !important;
          opacity: 1 !important;
        }
        .custom-swiper-bullet-active {
          background: #3b82f6 !important;
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};

export default PostMediaModal;
