let cache = { value: null, time: 0 };

export default async function handler(req, res) {
  try {
    if (Date.now() - cache.time < 60000) {
      return res.status(200).json({ followers: cache.value });
    }

    const username = "themagicloic";

    const response = await fetch(
      `https://www.instagram.com/${username}/?__a=1&__d=dis`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0"
        }
      }
    );

    const text = await response.text();

    const data = JSON.parse(text);

    const followers =
      data.graphql.user.edge_followed_by.count;

    cache = {
      value: followers,
      time: Date.now()
    };

    res.status(200).json({ followers });

  } catch (e) {
    res.status(200).json({ error: "fail" });
  }
}