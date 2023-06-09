import { useState, useEffect } from "react";
const Body = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    filterUsers();
  }, [searchText]);

  const fetchUsers = async () => {
    const url = `https://randomuser.me/api/?results=10`;
    const data = await fetch(url);
    const jsonData = await data.json();
    setUsers(jsonData?.results);
    setFilteredUsers(jsonData?.results);
  };
  const filterUsers = () => {
    const filteredArray = users.filter((user) =>
      user.name.first.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredUsers(filteredArray);
  };
  const sortUsers = () => {
    const sortedArray = users
      .slice()
      .sort((a, b) =>
        a.name.first > b.name.first ? 1 : a.name.first < b.name.first ? -1 : 0
      );
    setFilteredUsers(sortedArray);
  };
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button
          onClick={() => {
            sortUsers();
          }}
        >
          Sort
        </button>
      </div>
      <h3>Users List</h3>
      {filteredUsers.length === 0 ? (
        `No Users Found`
      ) : (
        <ul>
          {filteredUsers.map((user) => (
            <li key={user.login.uuid}>
              {user.name.first} {user.name.last}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
export default Body;
