import { useState } from "react";
import { Modal, Fade, Backdrop } from "@material-ui/core";
import styled from "styled-components";
import "./App.css";
import ModalPage from "./components/ModalPage";

const StyledModalPage = styled(Modal)`
  .MuiBackdrop-root {
    background-color: rgba(0, 0, 0, 0.15);
  }
`;

const StyledModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 500;
  outline: none;
`;

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="App">
      <button type="button" onClick={() => setOpen(true)}>
        Open modal with tabs
      </button>

      <StyledModalPage
        disableAutoFocus
        disableEnforceFocus
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        onClose={() => setOpen(false)}
      >
        <Fade in={open}>
          <StyledModal>
            <ModalPage setOpen={setOpen} />
          </StyledModal>
        </Fade>
      </StyledModalPage>
    </div>
  );
}

export default App;
