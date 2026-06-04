export default function StatsBar() {
  return (
    <section className="max-w-7xl mx-auto">

      <div
        className="
        border
        border-green-900
        rounded-xl
        p-8
        grid
        grid-cols-5
        text-center
        "
      >

        <div>
          <h2 className="text-4xl text-green-400">3+</h2>
          <p>Major Projects Across Domains(Excluding Others)</p>
        </div>

        <div>
          <h2 className="text-4xl text-green-400">30K+</h2>
          <p>Image Dataset Collection and Preprocessing</p>
        </div>

        <div>
          <h2 className="text-4xl text-green-400">20-30+</h2>
          <p>FPS on Edge CV</p>
        </div>

        <div>
          <h2 className="text-4xl text-green-400">1</h2>
          <p>Research Paper Publication</p>
        </div>

        <div>
          <h2 className="text-4xl text-green-400">2+</h2>
          <p>Years of Learning and Building</p>
        </div>

      </div>

    </section>
  );
}