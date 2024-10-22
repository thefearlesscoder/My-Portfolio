import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div>
      <div className="w-full h-full ">
        <div>
          <div className="grid w-[100%] gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold"> Profile</h1>
              <p className="mb-5">Full Profile Preview</p>
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
                  src={user && user.avatar && user.avatar.url}
                  alt="Avatar"
                  className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
                />
              </div>

              <div className="grid gap-2 w-full sm:w-72">
                <Label>Resume</Label>
                <Link
                  to={user && user.resume && user.resume.url}
                  target="_blank"
                >
                  <img
                    src={user && user.resume && user.resume.url}
                    alt="Resume"
                    className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
                  />
                </Link>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Full Name</Label>
              <Input type="text" defaultValue={user.fullName} disabled></Input>
            </div>

            <div className="grid gap-2">
              <Label>Email</Label>
              <Input type="email" defaultValue={user.email} disabled></Input>
            </div>

            {/* <div className="grid gap-2">
              <Label>Phone</Label>
              <Input type="text" defaultValue={user.Phone} disabled></Input>
            </div> */}

            <div className="grid gap-2">
              <Label>About Me</Label>
              <Textarea
                type="text"
                defaultValue={user.aboutMe}
                disabled
              ></Textarea>
            </div>

            <div className="grid gap-2">
              <Label>Protfolio URL</Label>
              <Input
                type="text"
                defaultValue={user.portfolioURL}
                disabled
              ></Input>
            </div>

            <div className="grid gap-2">
              <Label>Github URL</Label>
              <Input type="text" defaultValue={user.githubURL} disabled></Input>
            </div>

            <div className="grid gap-2">
              <Label>LinkedIn URL</Label>
              <Input
                type="text"
                defaultValue={user.linkedInURL}
                disabled
                select
              ></Input>
            </div>

            <div className="grid gap-2">
              <Label>Instagram URL</Label>
              <Input
                type="text"
                defaultValue={user.instagramURL}
                disabled
                select
              ></Input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
