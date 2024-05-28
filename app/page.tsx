export default function Home() {
  const dateString = Date().toLocaleString();
  const [day, month, date, year, time] = dateString.split(" ");

  return (
    <>
      <main>
        {date}/{month}/{year} - {time}
      </main>
    </>
  );
}
