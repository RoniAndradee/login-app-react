import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Register() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleRegister = async (e) => {
		e.preventDefault();

		if (email === "" || password === "") {
			Swal.fire({
				icon: "error",
				title: "Cadastro não realizado!",
				text: "Preencha todos os campos!",
			});
		} else if (password.length < 6) {
			Swal.fire({
				icon: "error",
				title: "Cadastro não realizado!",
				text: "A senha deve ter no mínimo 6 caracteres.",
			});
		} else {
			const response = await fetch("http://localhost:5000/users", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});
			if (response.ok) {
				let timerInterval;
				Swal.fire({
					title: "Cadastro realizado com sucesso!",
					html: "Redirecionando para tela de login em: <b></b> milisegundos.",
					timer: 2000,
					timerProgressBar: true,
					didOpen: () => {
						Swal.showLoading();
						const timer = Swal.getPopup().querySelector("b");
						timerInterval = setInterval(() => {
							timer.textContent = `${Swal.getTimerLeft()}`;
						}, 100);
					},
					willClose: () => {
						clearInterval(timerInterval);
						navigate("/");
					},
				});
			}
		}
	};

	return (
		<div className="bg-white p-8 rounded shadow-md w-96">
			<h2 className="text-2xl font-bold mb-4">Cadastro</h2>
			<form onSubmit={handleRegister}>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="w-full p-2 border rounded mb-2"
					// required
				/>
				<input
					type="password"
					placeholder="Senha"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="w-full p-2 border rounded mb-2"
					// required
				/>
				<button
					type="submit"
					className="bg-green-500 text-white p-2 rounded w-full"
				>
					Cadastrar
				</button>
			</form>
			<p className="mt-4">
				Já tem uma conta?{" "}
				<Link to="/" className="text-green-500">
					Faça login
				</Link>
			</p>
		</div>
	);
}

export default Register;
