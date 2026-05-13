function Button({ text }) {

  return (

    <button
      type="submit"
      className="w-full bg-blue-600 text-white p-3 rounded-lg"
    >
      {text}
    </button>

  );
}

export default Button;