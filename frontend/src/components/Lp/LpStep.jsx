function LpStep(props) {
  return (
    <>
      <div
        className={`${props.style} flex my-10 lg:m-10 items-center nes-balloon`}
      >
        <img
          src={props.img}
          className="object-contain border-2 border-slate-300 border-solid w-36 "
        />
        <div className="lg:mx-10">
          <h3 className="text-2xl">{props.title}</h3>
          <p>{props.desc}</p>
        </div>
      </div>
    </>
  );
}

export default LpStep;
