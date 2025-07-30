export default function Button({ nome, classEditar, onClick }) {


    return (
        <>
            <button 
            onClick={onClick}
            className={`${classEditar} w-1/6 bg-[#02335E] text-white p-2 rounded-lg cursor-pointer`}>
                <p className="text-xl">{nome}</p>
            </button>
        </>
    );
}
