let cache = { value: null, time: 0 };

export default async function handler(req, res) {
  try {
    // cache 60 secondes
    if (Date.now() - cache.time < 60000) {
      return res.status(200).json({ followers: cache.value });
    }

    const username = "themagicloic";

    const response = await fetch(
      `https://www.instagram.com/${username}/`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0"
        }
      }
    );

    const html = await response.text();

    // on cherche le nombre d'abonnés dans le HTML
    const match = html.match(/"edge_followed_by":{"count":(\d+)}/);

    if (!match) {
      throw new Error("not found");
    }

    const followers = parseInt(match[1]);

    cache = {
      value: followers,
      time: Date.now()
    };

    res.status(200).json({ followers });

  } catch (e) {
    res.status(200).json({ error: "fail" });
  }
}