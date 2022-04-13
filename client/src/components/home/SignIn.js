import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Card, CardContent } from "@mui/material";
import { useAuthContext } from "../../contexts/AuthContext";
import Background from "../additional/Background";
import MainHeader from "../headers/MainHeader";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export default function SignIn() {
	const { signIn } = useAuthContext();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const email = data.get("email");
		const password = data.get("password");
		setLoading(true);
		try {
			await signIn(email, password);
			navigate("/creator");
		} catch (err) {
			alert(err.message);
		}
		setLoading(false);
	};

	return (
		<Container maxWidth="sm">
			<Card sx={{ mt: 5, borderRadius: "20px" }}>
				<CardContent sx={{ mt: 3, mb: 5, mx: 5 }}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Prisijungimas
						</Typography>
						<Box
							component="form"
							onSubmit={handleSubmit}
							noValidate
							sx={{ mt: 1 }}
						>
							<TextField
								margin="normal"
								required
								fullWidth
								id="email"
								label="Elektroninis paštas"
								name="email"
								autoComplete="email"
								autoFocus
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								name="password"
								label="Slaptažodis"
								type="password"
								id="password"
								autoComplete="current-password"
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2, color: "white" }}
								color="secondary"
								disabled={loading}
							>
								{loading ? (
									<CircularProgress color="secondary" />
								) : (
									"Prisijungti"
								)}
							</Button>
							<Grid container>
								<Grid item xs>
									<Link href="#" variant="body2">
										Pamiršote slaptažodį?
									</Link>
								</Grid>
								<Grid item>
									<Link href="/home/signup" variant="body2">
										{"Neturite paskyros? Prisiregistruokite"}
									</Link>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</CardContent>
			</Card>
		</Container>
	);
}
