import { Link, useParams, Navigate } from "react-router-dom";
import { useState } from "react";
import Perks from "../Perks";
import axios from "axios";

async function addPhotoByLink(ev)
{
  ev.preventDefault();
  await axios.post("upload-by-link", {link : photoLink})
}

export default function PlacesPage() {
  const { action } = useParams();

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState("");
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState("");

  const [redirect, setRedirect] = useState("");

  // function inputHeader(text)
  // {
  //   <h2 className="text-2xl mt-4">Title</h2>
  // }

  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    axios
      .post("/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filename } = response;
        setAddedPhotos((prev) => {
          return [...prev, filename];
        });
      });
  }

  async function addNewPlace(ev) {
    ev.preventDefault();
    const placedata = { title, address, addedPhotos, description, perks };
    await axios.post("/places", placedata);
    setRedirect("/account/places");
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full "
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                clipRule="evenodd"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}

      {action === "new" && (
        <div className="">
          <form action="" onSubmit={addNewPlace}>
            <h2 className="mx-3 font-bold">Title</h2>
            <input
              type="text"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              className="text-l mt-4"
              name=""
              id=""
              placeholder="title eg: My lovely apartment"
            />
            <h2 className="mx-3 font-bold mt-5">Address</h2>
            <input
              type="text"
              value={address}
              onChange={(ev) => setAddress(ev.target.value)}
              className="text-l mt-4"
              name=""
              id=""
              placeholder="Address"
            />
            <h2 className="mx-3 font-bold mt-5">Photos</h2>
        <div className="flex gap-2">
            <input
              type="text"
              value={photoLink}
              onChange={(ev) => setPhotoLink(ev.target.value)}
              className="text-l mt-4 "
              name=""
              id=""
              placeholder="title"
            />
            <button onClick={addPhotoByLink} className="bg-primary-200 px-4 rounded-2xl">
            <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-6 mx-auto"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>Add photo</button>
            </div>
            <div className="flex gap-2">
              {/* <input type="text" 
              value={photoLink}
              onChange={ev=>setPhotoLink(ev.target.value)} */}

              {/* placeholder="{add using a link...}" /> */}
              {/* <label className=" mx-3 font-bold mt-5 ">
                Grab Photo
                
              </label> */}
            </div>

            {/* <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 "> */}
          
              {/* <button
                className="border bg-transparent rounded-2xl p-8 text-2xl text-gray-600 cursor-pointer bg-primary-200 px-4 rounded-2xl"
                onChange={uploadPhoto}
                // type="file" className="hidden"
              >
                
                  
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-20 mx-auto"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
                
              </button>
              
            </div> */}

            <h2 className="mx-3 font-bold mt-5 mb-3">Description</h2>
            <textarea
              className="mx-3 border border-gray-200 items-center  rounded-2xl"
              placeholder="Enter description"
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />

            <h2 className="mx-3 font-bold mt-4">Perks</h2>
            <Perks selected={perks} onChange={setPerks} />

            <button className="border items-center primary rounded-2xl p-8 text-2xl text-white">
              SAVE
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
