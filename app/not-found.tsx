import Link from "next/link";
export default function NotFound() {
  return <section className="phead" style={{ padding: "160px 0", borderBottom: 0 }}><div className="wrap"><p className="sec">Error 404</p><h1>We couldn’t find that page.</h1><p className="lead" style={{ marginBottom: 30 }}>It may have moved, or the link may be mistyped. Try the book directory or head back to the homepage.</p><div className="btns"><Link className="btn" href="/">Return Home</Link><Link className="btn alt" href="/discover">Discover Books</Link></div></div></section>;
}
