import React from "react";

export const Footer = () => {
  const styles: { footer: React.CSSProperties; small: React.CSSProperties } = {
    footer: {
      padding: '0.5rem',
      paddingLeft: '1rem',
      paddingRight: '1rem',
      borderTop: '1px solid #ccc',
      textAlign: 'center',
    },
    small: {
      fontSize: '0.875rem', 
    },
  };
  return (
    <footer style={styles.footer}>
       <small style={styles.small}>@2025 shiragaki</small>
    </footer>
  );
};
