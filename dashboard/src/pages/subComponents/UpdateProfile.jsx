import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { clearAllUserErrors, getUser, resetProfile, updateProfile } from "@/store/slices/userSlices";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const { user, loading, error, isUpdated, message } = useSelector(
    (state) => state.user
  );
  const [fullName, setFullName] = useState(user && user.fullName);
  const [email, setEmail] = useState(user && user.email);
  const [aboutMe, setAboutMe] = useState(user && user.aboutMe);
  const [portfolioURL, setPortfolioURL] = useState(
    user && user.portfolioURL
  );
  const [githubURL, setGithubURL] = useState(user && user.githubURL);
  const [linkedInURL, setLinkedInUrl] = useState(
    user && (user.linkedInURL === "undefined" ? "" : user.linkedInURL)
  );
  const [instagramURL, setInstagramURL] = useState(
    user && (user.instagramURL === "undefined" ? "" : user.instagramURL)
  );
  const [avatar, setAvatar] = useState(user && user.avatar && user.avatar.url);
  const [avatarPreview, setAvatarPreview] = useState(
    user && user.avatar && user.avatar.url
  );
  const [resume, setResume] = useState(user && user.resume && user.resume.url);
  const [resumePreview, setResumePreview] = useState(
    user && user.resume && user.resume.url
  );

  const dispatch = useDispatch();

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    }
  }
  const resumeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
  };

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("aboutMe", aboutMe);
    formData.append("portfolioURL", portfolioURL);
    formData.append("linkedInURL", linkedInURL);
    formData.append("githubURL", githubURL);
    formData.append("instagramURL", instagramURL);
    formData.append("avatar", avatar);
    formData.append("resume", resume);
    dispatch(updateProfile(formData));

  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isUpdated) {
      dispatch(getUser());
      dispatch(resetProfile());
    }
    if (message) {
      toast.success(message);
    }
  },[dispatch, loading, error, isUpdated])

  return (
    <div>
      <div className="w-full h-full ">
        <div>
          <div className="grid w-[100%] gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold"> Update Profile</h1>
              <p className="mb-5">Update Your Profile</p>
            </div>
          </div>

          <div className="grid gap-6">
            <div
              className="flex items-start lg:justify-center lg:items-center flex-col
              lg:flex-row gap-5"
            >
              <div className="grid gap-2 w-full sm:w-72">
                <Label className="mb-1">Profile Image</Label>
                <img
                  src={avatarPreview ? `${avatarPreview}` : `./vite.svg`}
                  alt="Avatar"
                  className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
                />
                <div className="relative">
                  <Input
                    type="file"
                    className="avatar-update-btn"
                    onChange={avatarHandler}
                  ></Input>
                </div>
              </div>

              <div className="grid gap-2 w-full sm:w-72">
                <Label>Resume</Label>
                <Link
                  to={user && user.resume && user.resume.url}
                  target="_blank"
                >
                  <img
                    src={resumePreview ? `${resumePreview}` : `/avatarHolder.jpg`}
                    alt="Resume"
                    className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
                  />
                </Link>
                <div className="relative">
                  <Input
                    type="file"
                    className="avatar-update-btn"
                    onChange={resumeHandler}
                  ></Input>
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Full Name</Label>
              <Input
                type="text"
                placeholder="Your Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              ></Input>
            </div>

            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                type="text"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Input>
            </div>

            {/* <div className="grid gap-2">
              <Label>Phone</Label>
              <Input type="text" defaultValue={user.Phone} disabled></Input>
            </div> */}

            <div className="grid gap-2">
              <Label>About Me</Label>
              <Textarea
                type="text"
                placeholder="Write Something about youself"
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
              ></Textarea>
            </div>

            <div className="grid gap-2">
              <Label>Protfolio URL</Label>
              <Input
                type="text"
                placeholder="Your Portfolio URL"
                value={portfolioURL}
                onChange={(e) => setPortfolioURL(e.target.value)}
              ></Input>
            </div>

            <div className="grid gap-2">
              <Label>Github URL</Label>
              <Input
                type="text"
                placeholder="Your Github URL"
                value={githubURL}
                onChange={(e) => setGithubURL(e.target.value)}
              ></Input>
            </div>

            <div className="grid gap-2">
              <Label>LinkedIn URL</Label>
              <Input
                type="text"
                placeholder="Your LinkedIn URL"
                value={linkedInURL}
                onChange={(e) => setLinkedInUrl(e.target.value)}
              ></Input>
            </div>

            <div className="grid gap-2">
              <Label>Instagram URL</Label>
              <Input
                type="text"
                placeholder="Your Instagram URL"
                value={instagramURL}
                onChange={(e) => setInstagramURL(e.target.value)}
              ></Input>
            </div>

            <div className="grid gap-2">
              {!loading ? (
                <Button onClick={handleUpdateProfile} className="w-full">
                  Update Pofile
                </Button>
              ) : (
                <SpecialLoadingButton content="Updating"></SpecialLoadingButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
