import cat from "../../assets/Nemo_Cat.jpg";

export default function About() {
  return (
    <div>
      <h1>
        This App was built for users to search for recipes based on ingredients
        they have at home
      </h1>
      <p>
        If you don't know the name of the ingredient, you can go to upload
        section and upload an image to identify it
      </p>
      <p>I created this app so I can make food for my kitty</p>
      <p>Nemo weights 500 pounds and eats a lot</p>
      <img src={cat} alt="cat" style={{ width: "200px", height: "200px" }} />
      <hr />
    </div>
  );
}
