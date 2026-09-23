import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", {
    drink: null,
    error: null
  });
});

app.post("/search", async (req, res) => {
  const cocktailName = req.body.cocktail;

  try {
    const response = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(cocktailName)}`
    );

    if (response.data.drinks) {
      const drink = response.data.drinks[0];

      res.render("index.ejs", {
        drink: drink,
        error: null
      });
    } else {
      res.render("index.ejs", {
        drink: null,
        error: "Cocktail not found. Please try another search."
      });
    }

  } catch (error) {
    console.error(error);

    res.render("index.ejs", {
      drink: null,
      error: "Something went wrong. Please try again."
    });
  }
});

app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});