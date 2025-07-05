import React, { useState } from "react"
import { Modal, IconButton, Box, Fade, Backdrop, Zoom, Typography, Chip } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import FullscreenIcon from "@mui/icons-material/Fullscreen"
import { Calendar, Award, ExternalLink, User } from "lucide-react"

const Certificate = ({ ImgSertif, certificate }) => {
	const [open, setOpen] = useState(false)

	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	// If we have certificate data, use it. Otherwise fall back to just showing image
	const showDetails = certificate && certificate.title

	return (
		<Box component="div" sx={{ width: "100%" }}>
			{/* Thumbnail Container */}
			<Box
				sx={{
					position: "relative",
					overflow: "hidden",
					borderRadius: 2,
					boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
					transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
					"&:hover": {
						transform: "translateY(-5px)",
						boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
						"& .overlay": {
							opacity: 1,
						},
						"& .hover-content": {
							transform: "translate(-50%, -50%)",
							opacity: 1,
						},
						"& .certificate-image": {
							filter: "contrast(1.05) brightness(1) saturate(1.1)",
						},
					},
				}}>
				
				{/* Certificate Image */}
				<Box
					sx={{
						position: "relative",
						"&::before": {
							content: '""',
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							backgroundColor: "rgba(0, 0, 0, 0.1)",
							zIndex: 1,
						},
					}}>
					<img
						className="certificate-image"
						src={ImgSertif || "/certificates/certificate-placeholder.svg"}
						alt={certificate?.title || "Certificate"}
						style={{
							width: "100%",
							height: "auto",
							display: "block",
							objectFit: "cover",
							filter: "contrast(1.10) brightness(0.9) saturate(1.1)",
							transition: "filter 0.3s ease",
						}}
						onClick={handleOpen}
						onError={(e) => {
							// Fallback to placeholder if image fails to load
							e.target.src = "/certificates/certificate-placeholder.svg";
						}}
					/>
				</Box>

				{/* Certificate Details Overlay */}
				{showDetails && (
					<Box
						sx={{
							position: "absolute",
							bottom: 0,
							left: 0,
							right: 0,
							background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
							color: "white",
							p: 2,
							zIndex: 2,
						}}>
						<Typography variant="h6" sx={{ fontSize: "0.9rem", fontWeight: 600, mb: 1 }}>
							{certificate.title}
						</Typography>
						<Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
							<User size={14} />
							<Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
								{certificate.issuer}
							</Typography>
						</Box>
						<Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
							<Calendar size={14} />
							<Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
								{certificate.issueDate}
							</Typography>
						</Box>
						{certificate.skills && (
							<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
								{certificate.skills.slice(0, 3).map((skill, index) => (
									<Chip 
										key={index} 
										label={skill} 
										size="small" 
										sx={{ 
											fontSize: "0.6rem", 
											height: "18px",
											backgroundColor: "rgba(255,255,255,0.2)",
											color: "white",
											"& .MuiChip-label": {
												px: 1
											}
										}} 
									/>
								))}
								{certificate.skills.length > 3 && (
									<Chip 
										label={`+${certificate.skills.length - 3}`} 
										size="small" 
										sx={{ 
											fontSize: "0.6rem", 
											height: "18px",
											backgroundColor: "rgba(255,255,255,0.3)",
											color: "white",
											"& .MuiChip-label": {
												px: 1
											}
										}} 
									/>
								)}
							</Box>
						)}
					</Box>
				)}

				{/* Hover Overlay */}
				<Box
					className="overlay"
					sx={{
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						opacity: 0,
						transition: "all 0.3s ease",
						cursor: "pointer",
						zIndex: 3,
					}}
					onClick={handleOpen}>
					{/* Hover Content */}
					<Box
						className="hover-content"
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -60%)",
							opacity: 0,
							transition: "all 0.4s ease",
							textAlign: "center",
							width: "100%",
							color: "white",
						}}>
						<FullscreenIcon
							sx={{
								fontSize: 40,
								mb: 1,
								filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
							}}
						/>
						<Typography
							variant="h6"
							sx={{
								fontWeight: 600,
								textShadow: "0 2px 4px rgba(0,0,0,0.3)",
							}}>
							View Certificate
						</Typography>
					</Box>
				</Box>
			</Box>

			{/* Modal */}
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 300,
					sx: {
						backgroundColor: "rgba(0, 0, 0, 0.9)",
						backdropFilter: "blur(5px)",
					},
				}}
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					margin: 0,
					padding: 0,
					"& .MuiBackdrop-root": {
						backgroundColor: "rgba(0, 0, 0, 0.9)",
					},
				}}>
				<Box
					sx={{
						position: "relative",
						width: "auto",
						maxWidth: "90vw",
						maxHeight: "90vh",
						m: 0,
						p: 0,
						outline: "none",
						"&:focus": {
							outline: "none",
						},
					}}>
					{/* Close Button */}
					<IconButton
						onClick={handleClose}
						sx={{
							position: "absolute",
							right: 16,
							top: 16,
							color: "white",
							bgcolor: "rgba(0,0,0,0.6)",
							zIndex: 1,
							padding: 1,
							"&:hover": {
								bgcolor: "rgba(0,0,0,0.8)",
								transform: "scale(1.1)",
							},
						}}
						size="large">
						<CloseIcon sx={{ fontSize: 24 }} />
					</IconButton>

					{/* Modal Image */}
					<img
						src={ImgSertif || "/certificates/placeholder.jpg"}
						alt="Certificate Full View"
						style={{
							display: "block",
							maxWidth: "100%",
							maxHeight: "90vh",
							margin: "0 auto",
							objectFit: "contain",
						}}
					/>

					{/* Certificate Details in Modal */}
					{showDetails && (
						<Box
							sx={{
								position: "absolute",
								bottom: 0,
								left: 0,
								right: 0,
								background: "linear-gradient(transparent, rgba(0,0,0,0.9))",
								color: "white",
								p: 3,
								textAlign: "center",
							}}>
							<Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
								{certificate.title}
							</Typography>
							<Box sx={{ display: "flex", justifyContent: "center", gap: 4, mb: 2 }}>
								<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
									<User size={18} />
									<Typography variant="body1">
										{certificate.issuer}
									</Typography>
								</Box>
								<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
									<Calendar size={18} />
									<Typography variant="body1">
										{certificate.issueDate}
									</Typography>
								</Box>
							</Box>
							{certificate.credentialId && (
								<Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
									Credential ID: {certificate.credentialId}
								</Typography>
							)}
							{certificate.skills && (
								<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center" }}>
									{certificate.skills.map((skill, index) => (
										<Chip 
											key={index} 
											label={skill} 
											variant="outlined"
											sx={{ 
												color: "white",
												borderColor: "rgba(255,255,255,0.3)",
												"&:hover": {
													borderColor: "rgba(255,255,255,0.6)",
												}
											}} 
										/>
									))}
								</Box>
							)}
						</Box>
					)}
				</Box>
			</Modal>
		</Box>
	)
}

export default Certificate
