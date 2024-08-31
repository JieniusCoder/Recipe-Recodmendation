import cat from '../../assets/Nemo_Cat.jpg';

export default function About() {
    return (
        <div>
        <h1>This App is about me showing off my skills. I need a job and people need to see something cool</h1>
        <p>Someone please hire me so I can buy food for my cat</p>
        <p>I am broke and I need a job</p>
        <p>My cat is hungry, he weights 500 pounds and eats a lot</p>
        <img src={cat} alt="cat" style={{width: '200px', height: "200px"}}/>
        <p>Please hire me so I can buy this kitty some food</p>
        <p>Or this cat and I will have to spend our Christmas selling match on the street</p>
        <hr />
        </div>
    );
}