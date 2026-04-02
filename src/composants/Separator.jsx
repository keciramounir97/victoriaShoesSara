import image from "../assets/separator.svg"

export default function Separator() {
  return (
    <section className="my-2 flex justify-center">
        <div className="relative rounded-3xl overflow-hidden" style={{width: '25%', height: '3vh', marginTop: '1.6rem'}}>
        <img
          src={image}
          alt="Separator"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  )
}
