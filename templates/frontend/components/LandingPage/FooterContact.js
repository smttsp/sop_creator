import Link from 'next/link';

const linkData = [
  { text: 'information', href: '/' },
  { text: 'this is info', href: '/' },
  { text: 'explanation', href: '/' },
  // Add more objects for other links
];

const FooterContact = () => {
  return (
    <div className="grid grid-flow-row text-white text-md w-auto px-10  mr-48">
      <div className="utility flex flex-3 gap-32 text-sm font-light">
        {[0, 1, 2].map((index) => (
          <div key={index} className={`${index === 2 ? 'mr-6' : ''}`}>
            <ul>
              {linkData.map((item, i) => (
                <li key={i} className="mb-3 hover:font-semibold hover:text-gray-500">
                  <Link href={item.href}>
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex gap-6 justify-center text-md border-t mt-4 border-white pt-4">
        <div className="text-sm hover:font-bold hover:text-gray-500">
          <Link href="/your-contact-page">
            contact
          </Link>
        </div>
        <div className="text-sm hover:font-bold hover:text-gray-500">
          <Link href="/your-contact-page">
            contact2
          </Link>
        </div>
        <div className="text-sm hover:font-bold hover:text-gray-500">
          <Link href="/your-contact-page">
            contact3
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterContact;
