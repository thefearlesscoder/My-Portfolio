import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import React, { useEffect, useState } from 'react'
import SpecialLoadingButton from './SpecialLoadingButton';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTimeline, clearAllTimelineErrors, getAllTimeline, resetTimelineSlice } from '@/store/slices/timelineSlice';
import { toast } from 'react-toastify';
import { Textarea } from '@/components/ui/textarea';

const AddTimeline = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState("");
  const [start, setFrom] = useState("");
  const [end, setTo] = useState("");

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.timeline);

  const handleAddTimeline = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("start", start);
    formData.append("end", end);  
    dispatch(addNewTimeline(formData));
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllTimelineErrors())
    }
    if (message) {
      toast.success(message);
      dispatch(resetTimelineSlice())
      dispatch(getAllTimeline())
    }
  },[dispatch, error, message, loading])

  return (
    <div>
      <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
        <form className="w-[100%] px-5 md:w-[650px]" onSubmit={(e)=>handleAddTimeline(e)}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="font-semibold leading-7 text-gray-900 text-3xl text-center">
                Add a New Timeline
              </h2>
              <div className="mt-10 flex flex-col gap-5">
                <div className="w-full sm:col-span-4">
                  <Label className="font-semibold leading-7 text-gray-900 text-3xl text-center">
                    Title
                  </Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        type="text"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Describe here"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full sm:col-span-4">
                  <Label className="font-semibold leading-7 text-gray-900 text-3xl text-center">
                    Description
                  </Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <Textarea
                        type="text"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="High School"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full sm:col-span-4">
                  <Label className="font-semibold leading-7 text-gray-900 text-3xl text-center">
                    From
                  </Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        type="text"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Starting period"
                        value={start}
                        onChange={(e) => setFrom(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full sm:col-span-4">
                  <Label className="font-semibold leading-7 text-gray-900 text-3xl text-center">
                    To
                  </Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        type="text"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Ending Period"
                        value={end}
                        onChange={(e) => setTo(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {!loading ? (
                <Button
                  type="submit"
                  // onClick={()=>handleAddTimeline()} 
                  className="w-full"
                >
                  Add Timeline
                </Button>
              ) : (
                <SpecialLoadingButton content={"Adding New Time line"} />
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTimeline
