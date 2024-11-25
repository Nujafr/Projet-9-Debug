import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); })

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      
      try {
        await mockContactApi();
        setSending(false);
        onSuccess(); // Appel de onSuccess après succès de l'API
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" required />
          <Field placeholder="" label="Prénom" required />
          <Select
            selection={["Personnel", "Entreprise"]}  // Correction de "Personel"
            onChange={() => null}
            label="Personnel / Entreprise"  // Correction de "Personel"
            type="large"
            titleEmpty
            required
          />
          <Field 
            placeholder="" 
            label="Email" 
            type={FIELD_TYPES.EMAIL}  // Ajout du type email
            required 
          />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            required
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;