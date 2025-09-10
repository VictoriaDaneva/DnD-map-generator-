import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import request from "../utils/request";

const baseUrl = `http://localhost:8080/api/products`;
const profileUrl = `http://localhost:8080/api/users/profile`;

//comments

export const postComment = async (mapId, text, accessToken) => {
  const options = {
    headers: { "X-Authorization": accessToken },
  };
  const response = await request.post(
    `${baseUrl}/${mapId}/comments`,
    { text },
    options
  );
  return response;
};

export const deleteComment = async (commentId, accessToken) => {
  const options = {
    headers: { "X-Authorization": accessToken },
  };
  const response = await request.delete(
    `${baseUrl}/comments/${commentId}`,
    options
  );
  return response;
};
//map
export const useDeleteMap = () => {
  const { accessToken } = useAuth();

  const deleteMap = async (mapId) => {
    const options = {
      headers: {
        "X-Authorization": accessToken,
      },
    };

    try {
      const response = await request.delete(`${baseUrl}/${mapId}`, options);
      return response;
    } catch (error) {
      console.error("❌ Error deleting map:", error);
      throw error;
    }
  };

  return deleteMap;
};

export const createMap = async (mapData, accessToken) => {
  try {
    const options = accessToken
      ? { headers: { "X-Authorization": accessToken } }
      : {};

    return await request.post(baseUrl, mapData, options);
  } catch (error) {
    console.error("Error creating map:", error);
    throw error;
  }
};

export const getMap = (mapId) => {
  const { accessToken } = useAuth();
  const [map, setMap] = useState({});

  useEffect(() => {
    const options = accessToken
      ? { headers: { "X-Authorization": accessToken } }
      : {};

    request.get(`${baseUrl}/${mapId}`, options).then(setMap);
  }, [mapId, accessToken]);

  return { map };
};

export const getMaps = async () => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch pets");
  }
  return await response.json();
};
