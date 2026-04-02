import image from "../assets/separator.svg"

export default function Separator() {
  return (
    <section className="my-3 sm:my-4 flex justify-center px-4">
        <div className="relative rounded-3xl overflow-hidden w-full max-w-[300px] h-3 sm:h-4 mt-4 sm:mt-6">
        <img
          src={image}
          alt="Separator"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  )
}
