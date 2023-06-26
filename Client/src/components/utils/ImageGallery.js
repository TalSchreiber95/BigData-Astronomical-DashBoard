import React, { useState } from "react";
import { IconButton, Tooltip, Modal, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const ImageGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const currentImage = images[currentIndex];

  return (
    <div style={{ position: "relative", maxWidth: 400 }}>
      <img
        src={currentImage}
        alt={`Image ${currentIndex}`}
        style={{ maxHeight: 400, maxWidth: 400, cursor: "pointer" }}
        onClick={handleOpenModal}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          transform: "translateX(-50%)",
          color: "white",
          textAlign: "center",
          marginTop: "1rem",
        }}
      >
        <Typography variant="h6">
          {currentImage?.split("_")[2]?.split(".jpg")[0]}
        </Typography>
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
        }}
      >
        <Tooltip title="Open" placement="top">
          <IconButton
            onClick={handleOpenModal}
            style={{
              position: "absolute",
              top: 20,
              right: 40,
              left: 40,
              bottom: 20,
              color: "white",
              fontSize: "2rem",
            }}
          ></IconButton>
        </Tooltip>
        <Tooltip title="Previous" placement="right">
          <IconButton
            onClick={handlePrevImage}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              color: "white",
              fontSize: "2rem",
            }}
          >
            <ArrowBack />
          </IconButton>
        </Tooltip>
        <Tooltip title="Next" placement="left">
          <IconButton
            onClick={handleNextImage}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              color: "white",
              fontSize: "2rem",
            }}
          >
            <ArrowForward />
          </IconButton>
        </Tooltip>
      </div>

      <Modal open={modalOpen} onClose={handleCloseModal}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <img
            src={currentImage}
            alt={`Image ${currentIndex}`}
            style={{ maxHeight: "90vh", maxWidth: "90vw" }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "10%",
              transform: "translateX(-50%)",
              color: "white",
              textAlign: "center",
              marginTop: "1rem",
            }}
          >
            <Typography variant="h6">
              {currentImage?.split("_")[2]?.split(".jpg")[0]}
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1rem",
            }}
          >
            <Tooltip title="Close" placement="top">
              <IconButton
                onClick={handleCloseModal}
                style={{
                  position: "absolute",
                  top: 20,
                  right: 40,
                  left: 40,
                  bottom: 20,
                  color: "white",
                  fontSize: "2rem",
                  marginRight: "1rem",
                }}
              ></IconButton>
            </Tooltip>
            <Tooltip title="Previous" placement="right">
              <IconButton
                onClick={handlePrevImage}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  color: "white",
                  fontSize: "2rem",
                  marginRight: "1rem",
                }}
              >
                <ArrowBack />
              </IconButton>
            </Tooltip>
            <Tooltip title="Next" placement="left">
              <IconButton
                onClick={handleNextImage}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  color: "white",
                  fontSize: "2rem",
                  marginLeft: "1rem",
                }}
              >
                <ArrowForward />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ImageGallery;
