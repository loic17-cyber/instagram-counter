let cache = { value: null, time: 0 };

export default async function handler(req, res) {
  try {
    // cache 60 sec
    if (Date.now() - cache.time < 60000) {
      return res.status(200).json({ followers: cache.value });
    }

    const username = "themagicloic";

    const response = await fetch(
      `https://i.instagram.com/api/v1/users/web_profile_info/?username=${username}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
          "x-ig-app-id": "936619743392459"
        }
      }
    );

    const data = await response.json();

    const followers =
      data.data.user.edge_followed_by.count;

    cache = {
      value: followers,
      time: Date.now()
    };

    res.status(200).json({ followers });

  } catch (e) {
    res.status(500).json({ error: "fail" });
  }
}