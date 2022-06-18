import PropTypes from 'prop-types';

export default function ContactList({ filteredContacts, deleteContact }) {
  return (
    <>
      <ul>
        {filteredContacts().length ? (
          filteredContacts().map(({ name, id, number }) => (
            <li key={id}>
              {name}: {number}
              <button type="button" value={name} onClick={deleteContact}>
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>So far no contacts</p>
        )}
      </ul>
    </>
  );
}

ContactList.propTypes = {
  deleteContact: PropTypes.func.isRequired,
  filteredContacts: PropTypes.func.isRequired,
};
