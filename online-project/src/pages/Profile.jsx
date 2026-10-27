import React, { useState } from "react";

function Profile() {
  const [name, setName] = useState("Your Name");
  const [email, setEmail] = useState("your@email.com");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState("");

  const handleSave = (e) => {
    e.preventDefault();

    alert("Profile updated successfully!");
  };

  return (
    <div className="profile-page">
      <h1>My Profile</h1>

      <form onSubmit={handleSave}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Phone</label>
          <input
            type="tel"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <label>Skills</label>
          <textarea
            placeholder="Example: JavaScript, React, Java..."
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>

        <button type="submit">
          Save Profile
        </button>
      </form>
    </div>
  );
}

export default Profile;