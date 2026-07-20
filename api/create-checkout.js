export default async function handler(req, res) {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      status: false,
      message: "Method not allowed"
    });
  }

  try {

    const {
      email,
      amount,
      firstName,
      lastName
    } = req.body;

    const response = await fetch(
      "https://api-d.squadco.com/transaction/initiate",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.SQUAD_SECRET_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          amount,
          currency: "NGN",
          first_name: firstName,
          last_name: lastName,
          initiate_type: "inline"
        })
      }
    );

    const data = await response.json();

    return res.status(response.status).json(data);

  } catch (err) {

    return res.status(500).json({
      status: false,
      message: err.message
    });

  }

}
