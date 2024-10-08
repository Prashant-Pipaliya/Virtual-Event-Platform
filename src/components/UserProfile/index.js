import React, { useState } from "react";
import { useUser } from "../../context/UserContext";

const UserProfile = () => {
  const { user, setUser } = useUser();
  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [photo, setPhoto] = useState(user ? user.photo : "");
  const [isProfilePublic, setIsProfilePublic] = useState(
    user ? user.isProfilePublic : true
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }
    setLoading(true);
    const updatedUser = { name, email, photo, isProfilePublic };
    setUser(updatedUser);
    setLoading(false);
    setError("");
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setError("Please upload a valid image file");
    }
  };

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <form onSubmit={handleUpdateProfile}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />

        <input type="file" onChange={handlePhotoUpload} accept="image/*" />
        {photo && (
          <div className="profile-photo">
            <img
              src={photo}
              alt="Profile"
              style={{ width: "100px", borderRadius: "50%" }}
            />
          </div>
        )}

        <label>
          <input
            type="checkbox"
            checked={isProfilePublic}
            onChange={(e) => setIsProfilePublic(e.target.checked)}
          />
          Make Profile Public
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>

      {user && (
        <div className="profile-details">
          <h3>Profile Details:</h3>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {user.photo && (
            <div className="profile-photo">
              <img
                src={user.photo}
                alt="Profile"
                style={{ width: "100px", borderRadius: "50%" }}
              />
            </div>
          )}
          <p>
            Profile Visibility: {user.isProfilePublic ? "Public" : "Private"}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
