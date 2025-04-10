import Link from "next/link";
import React from "react";

export const Header = () => {
  const styles = {
    header: {
      padding: '1.25rem',
      paddingLeft: '2.5rem',
      paddingRight: '2.5rem',
      borderBottom: '1px solid #ccc',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    h1: {
      fontSize: '1.5rem',
      fontWeight: '800',
    },
  };

  return (
    <header style={styles.header}>
      <div>
        <h1 style={styles.h1}>
          <Link href="/">TODO Application</Link>
        </h1>
      </div>
    </header>
  );
};