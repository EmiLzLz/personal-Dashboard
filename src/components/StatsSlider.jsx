import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useApi from "../hooks/useAPI";

const CardSlider = () => {
  const {
    data: users,
    loading,
    error,
  } = useApi("https://jsonplaceholder.typicode.com/users?_limit=10");

  if (loading)
    return (
      <p className="text-center text-gray-400 mt-8">Loading users...</p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 mt-8">
        Error with loading users.
      </p>
    );

  return (
    <div className="px-4 pt-10 max-w-[100vw] overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={4}
        slidesPerGroup={4}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        style={{ width: "100%" }}
        breakpoints={{
          320: { slidesPerView: 1, slidesPerGroup: 1 },
          640: { slidesPerView: 2, slidesPerGroup: 2 },
          1024: { slidesPerView: 4, slidesPerGroup: 4 },
        }}
      >
        {users.map((user) => (
          <SwiperSlide
            key={user.id}
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
          >
            <div className="card-container bg-element-light dark:bg-element-dark rounded-lg max-w-[300px] w-full flex flex-col shadow-lg">
              <div className="bg-element-light dark:bg-element-dark text-text-dark dark:text-text-light font-semibold text-center py-3 rounded-t-lg">
                User ID #{user.id}
              </div>
              <div className="p-4 flex flex-col flex-grow text-text-dark dark:text-text-light text-sm space-y-2">
                <h3 className="text-lg font-semibold truncate">{user.name}</h3>
                <p className="text-text-dark dark:text-text-light truncate">@{user.username}</p>

                <div>
                  <span className="font-semibold text-text-dark dark:text-text-light">Email:</span>{" "}
                  <a
                    href={`mailto:${user.email}`}
                    className="text-text-dark dark:text-text-light hover:underline truncate block"
                    title={user.email}
                  >
                    {user.email}
                  </a>
                </div>

                <div>
                  <span className="font-semibold text-text-dark dark:text-text-light">Tel:</span>{" "}
                  <span className="truncate block" title={user.phone}>
                    {user.phone}
                  </span>
                </div>

                <div>
                  <span className="font-semibold text-text-dark dark:text-text-light">CiTY:</span>{" "}
                  <span className="truncate block" title={user.address.city}>
                    {user.address.city}
                  </span>
                </div>

                <div>
                  <span className="font-semibold text-text-dark dark:text-text-light">Web:</span>{" "}
                  <a
                    href={`http://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-dark dark:text-text-light hover:underline truncate block"
                    title={user.website}
                  >
                    {user.website}
                  </a>
                </div>

                <div className="mt-auto flex justify-between gap-2 pt-3">
                  <button className="flex-grow px-3 py-1.5 bg-[#56E39F] text-white rounded-md text-sm font-medium hover:bg-[#4BC08A] transition">
                    Edit
                  </button>
                  <button className="flex-grow px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 transition">
                    View more
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardSlider;
