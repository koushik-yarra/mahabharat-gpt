
export default function Footer() {
  return (
    <footer className="border-t border-border/40 py-6 md:py-8">
      <div className="container flex flex-col items-center justify-center text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} koushikyerra3@gmail.com
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Seek wisdom, find peace through the epic.
        </p>
      </div>
    </footer>
  );
}
