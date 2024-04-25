import { useEffect, useState } from "react";

export const DruidScrollList = () => {
  const [scrolls, setScrolls] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://scrolls.druid.gg/v1");
      const data = await response.json();

      const scrolls = [];

      for (const cat of data) {
        for (const scroll of cat.repositories) {
          scrolls.push(scroll);
        }
      }

      return scrolls;
    };
    fetchData().then((data) => setScrolls(data));
  });

  return (
    <table>
      <tr>
        <th>App Name</th>
        <th>Artifact Url</th>
        <th>Tags</th>
        <th>Recommented Container Image</th>
      </tr>
      {scrolls.map((scroll) => (
        <tr>
          <td>{scroll.meta.attributes.name}</td>
          <td>{scroll.repository}</td>
          <td>
            <select>
              {scroll.tags.map((tag) => (
                <option value={tag}>{tag}</option>
              ))}
            </select>
          </td>
          <td>{scroll.meta.attributes.name}</td>
        </tr>
      ))}
    </table>
  );
};
