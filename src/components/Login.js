import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		if (email === "" || password === "") {
			Swal.fire({
				icon: "error",
				title: "Login não realizado!",
				text: "Preencha todos os campos!",
			});
		} else {
			const response = await fetch(
				`http://localhost:5000/users?email=${email}`
			);
			const users = await response.json();
			if (users.length > 0 && users[0].password === password) {
				let timerInterval;
				Swal.fire({
					title: "Login bem sucessido!",
					html: "Redirecionando para tela inicial em: <b></b> milisegundos.",
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
					},
				});
				navigate("/");
			} else {
				Swal.fire({
					icon: "error",
					title: "Login não sucessido!",
					text: "Credenciais inválidas.",
				});
			}
		}
	};

	return (
		<div className="bg-white p-8 rounded shadow-md w-96">
			<h2 className="text-2xl font-bold mb-4">Login</h2>
			<form onSubmit={handleLogin}>
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
					className="bg-blue-500 text-white p-2 rounded w-full"
				>
					Entrar
				</button>
			</form>
			<p className="mt-4">
				Não tem uma conta?{" "}
				<Link to="/register" className="text-blue-500">
					Cadastre-se
				</Link>
			</p>
		</div>
	);
}

export default Login;
