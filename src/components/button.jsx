export default function Button({ nome, classEditar }) {


    return (
        <>
            <button className={`${classEditar} w-1/6 bg-[#02335E] p-2 rounded-lg cursor-pointer`}>
                <p className="text-white text-xl">{nome}</p>
            </button>
        </>
    );
}
