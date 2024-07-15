import React, { useEffect, useRef, useState } from 'react'
import { estate_eating_table } from '../../assets/images'
import { MdBathtub, MdEdit } from 'react-icons/md'
import toast from 'react-hot-toast'
import { PiToilet, PiWarehouse } from "react-icons/pi";
import { GiBed } from 'react-icons/gi';

export default function AllListing() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [images, setImages] = useState([])
  const modalRef = useRef(null)
  const formRef = useRef(null)
  const [inputs, setInputs] = useState({
    title: "",
    price: "",
    address: "",
    bedroom: 1,
    bathroom: 1,
    guestroom: 1,
    description: "",
    featured: "No",
    state: "FCT-Abuja",
    country: "Nigeria",
  })
  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  // const controller = new AbortController()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/listing")
        const data = await res.json()
        if (data.error) toast.error(data.message, { id: "123" })
        else setListings(prev => [...data.listing])
      } catch (error) {
        console.log({ error })
        toast.error(`Something went wrong. Please chech your internet connection`, { id: "123" })
      }
      finally {
        setLoading(false)
      }
    }
    fetchListings()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // const formData = new FormData()
    try {
      const res = await fetch("http://localhost:3000/api/listing/create", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ ...inputs, images }),
        headers: { "Content-Type": "application/json" }
      })
      const data = await res.json()
      if (data.error) toast.error(data.message, { id: "123" })
      else {
        toast.success(data.message, { id: "123" })
        setInputs(prev => ({
          title: "",
          price: "",
          address: "",
          bedroom: 1,
          bathroom: 1,
          guestroom: 1,
          description: "",
          featured: "No",
        }))
        setImages([])
        modalRef.current.close()
      }
      // else setListings(prev => [...data.listing])
    } catch (error) {
      console.log({ error })
      toast.error(`Something went wrong. Please check your internet connection`, { id: "123" })
    }
  }
  const handleUpload = async (e) => {
    const files = e.target.files, images = []
    for (let i = 0; i < files.length; i++) {
      const data = await uploadFile(files[i])
      images.push(data)
    }
    console.log('images', images)
    setImages(prev => [...images])
  }

  const uploadFile = async (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    const data = new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result)
      reader.onerror = err => reject(err)
    })
    return data
  }
  return (
    <main className="flex flex-col relative bg-slate-200">
      <div className="bg-main relative min-h-[65vh] h-[70vh] px-4">
        <img
          src={estate_eating_table}
          alt=""
          className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative py-10 container mx-auto text-white flex flex-col justify-center h-full gap-2">
          <h3 className="text-3xl md:text-4xl font-bold">Listing Management</h3>
          <p className="text-base md:text-lg">
            Manage all your listing on one page
          </p>
        </div>
      </div>
      <section className="py-10 px-4">
        <div className="container mx-auto bg-white rounded-md shadow-lg shadow-slate-300 p-4">
          <div className="overflow-x-scroll w-full">
            <table className="min-w-[50rem] w-full">
              <thead>
                <tr>
                  <th colSpan={6}>
                    <div className="bg-main text-white flex items-center justify-between gap-4 py-6 px-4 rounded-t-3xl">
                      <h4 className="text-xl md:text-3xl font-bold">Listing Table</h4>
                      <button onClick={() => modalRef.current.show()} className="bg-yellow text-main rounded-md py-2 px-8 font-medium cursor-pointer text-sm shadow">Create Listing</button>
                    </div>
                  </th>
                </tr>
                <tr className="text-slate-700 border-b border-slate-200">
                  <th className=''>S/N</th>
                  <th className='py-3 text-left pl-4'>Listing Details</th>
                  <th className='px-2'>Location</th>
                  <th className='px-2'>Country</th>
                  <th className='px-2'>Featured</th>
                  <th className='px-2'>Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-main/70 text-center">
                {
                  listings.length ?
                    listings.map((listing, i) => (
                      <tr key={listing.listing_id}>
                        <td className='text-center'>{i + 1}</td>
                        <td>
                          <aside
                            className="bg-white relative px-4 py-2 flex item-center gap-4 text-left"
                          >
                            <img
                              src={JSON.parse(listing?.images)[0]}
                              alt={listing.title}
                              className="min-h-14 max-h-14 sm:w-16 rounded-sm w-14 object-cover flex-shrink-0"
                            />
                            <div className="flex-1">
                              <h3 className=" text-lg sm:text-xl font-semibold leading-tight">
                                {listing.title}
                              </h3>
                              <p className="text-orange-600 leading-tight tracking-tight text-sm sm:text-base">
                                &#8358;{listing.price.toLocaleString()}
                              </p>
                            </div>
                          </aside>
                        </td>
                        <td className='px-2'>{listing.address}</td>
                        <td className='px-2'>{listing.state},{listing.country}</td>
                        <td className='px-2'>{listing.featured ? "True" : "False"}</td>
                        <td className='px-2 '>
                          <div className="py-2 flex justify-center gap-4 divide-x divide-slate-200">
                            <button onClick={() => handleEdit(listing.listing_id)} className="bg-green-500 h-7 w-7 rounded-md grid place-items-center text-white font-bold text-sm md:text-base"><MdEdit /></button>
                            <button onClick={() => handleDelete(listing.listing_id)} className="bg-[#f66] h-7 w-7 rounded-md grid place-items-center text-white font-bold text-sm md:text-base"><MdEdit /></button>
                          </div>
                        </td>
                      </tr>
                    ))
                    :
                    <tr>
                      <td className='p-6 select-none' colSpan={6}>{loading ? 'Fetching your Listing...' : 'No listing found. Please create a new Listing'}</td>
                    </tr>
                }

              </tbody>
            </table>
          </div>
        </div>
      </section>
      <dialog ref={modalRef} className='fixed top-0 left-0 w-screen h-screen bg-main/50 backdrop-blur-md z-50'>
        <div onClick={() => modalRef.current.close()} className="fixed top-0 left-0 w-screen h-screen bg-transparent"></div>
        <form encType='multipart/form-data' onSubmit={handleSubmit} ref={formRef} className="bg-white relative mx-auto shad p-5 rounded-lg grid md:grid-cols-2 w-full max-w-screen-md gap-3 md:gap-5 mt-10 z-40">
          <div className="flex items-center gap-4 md:col-span-2">
            <div className="bg-orange-400 rounded-full h-10 w-10 md:h-16 md:w-16 grid place-items-center text-main text-xl md:text-3xl">
              <PiWarehouse />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-main">Create new listing</h3>
            <div className="flex gap-2 justify-end flex-1">
              {
                images.length ? images.map((el, i) => (
                  <img key={i.toString()} src={el} alt={i} className="h-10 w-10 rounded-md object-cover object-center" />
                )) : ""
              }
            </div>
          </div>
          <input onChange={handleChange} value={inputs.title} name='title' type="text" placeholder='Enter Name of Property' required className="rounded-md border-2 border-slate-200 py-2 px-4 text-sm md:text-base outline-none hover:border-main" />
          <input onChange={handleChange} value={inputs.price} name='price' type="number" min={0} placeholder={`Property Price e.g. N2,000,000`} required className="rounded-md border-2 border-slate-200 py-2 px-4 text-sm md:text-base outline-none hover:border-main" />
          <input onChange={handleChange} value={inputs.address} name='address' placeholder='Property Location' required className="rounded-md border-2 border-slate-200 py-2 px-4 text-sm md:text-base outline-none hover:border-main" />
          <select onChange={handleChange} value={inputs.featured} name='featured' placeholder='Featured' required className="rounded-md border-2 border-slate-200 py-2 px-4 text-sm md:text-base outline-none hover:border-main" >
            <optgroup label='Should it be featured?'>
              <option value="Yes" className="font-sans bg-white">Yes</option>
              <option value="No" className="font-sans bg-white">No</option>
            </optgroup>
          </select>
          <div className="rounded-md border-2 border-slate-200 py-2 px-4 text-sm md:text-base outline-none hover:border-main grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center gap-2 text-base md:text-lg  md:gap-2">
              <GiBed />
              <input type="number" required onChange={handleChange} value={inputs.bedroom} name="bedroom" min="0" className=" flex-1 w-24 rounded-md border-2 border-slate-200 py-2 px-4 text-sm md:text-base outline-none hover:border-main" />
            </div>
            <div className="flex flex-col items-center gap-2 text-base md:text-lg  md:gap-2">
              <MdBathtub />
              <input type="number" required onChange={handleChange} value={inputs.bathroom} name="bathroom" min="0" className="flex-1 w-24 rounded-md border-2 border-slate-200 py-2 px-4 text-sm md:text-base outline-none hover:border-main" />
            </div>
            <div className="flex flex-col items-center gap-2 text-base md:text-lg  md:gap-2">
              <PiToilet />
              <input type="number" required onChange={handleChange} value={inputs.guestroom} name="guestroom" min="0" className="flex-1 w-24 rounded-md border-2 border-slate-200 py-2 px-4 text-sm md:text-base outline-none hover:border-main" />
            </div>
          </div>
          <textarea onChange={handleChange} value={inputs.description} name="description" id="" required placeholder='Enter a really nice description for this property' cols="30" rows="3" className="rounded-md border-2 border-slate-200 py-2 px-4 text-sm md:text-base outline-none hover:border-main "></textarea>
          <input multiple type="file" onChange={handleUpload} name="images" accept=".jpg, .jpeg, .png" className="border-dotted rounded-md border-2 border-yellow py-6 px-4 text-sm md:text-base outline-none hover:border-main md:col-span-2 cursor-pointer" />
          <button type="submit" className="rounded-md py-2 px-4 text-sm md:text-base outline-none md:col-span-2 bg-main text-white">Create listing</button>
        </form>
      </dialog>
    </main>
  )
}
