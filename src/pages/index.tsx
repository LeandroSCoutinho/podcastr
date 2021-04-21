//SPA
export default function Home() {
  fetch('http://localhost:3333/episodes')
  .then(episodes => episodes.json())
  .then(data => console.log(data));
  return (
      <h1>Index</h1>
  )
}
