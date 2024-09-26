# notes

**GITHUB**
 > - git add (add file)
 > - git commit -am "notes"
 > - git fetch -> git status -> git pull
 > - git clone (clone repo)

 **SERVER**
 > ip link: http://3.211.185.151/

 **INTERNET ARCHITECHTURE** (bottom up)
 > - 4 Application (HTTP (port 80), FTP, SSH, HTTPS (port 433))
 > - 3 Transport (TCP -- Transport Control Protocol (Reliable), UDP)
 > - 2 Internet (IP - Host - Host)
 > - 1 Physical (Wifi, Cell Network)
 > - DNS servers in place to build redundancy
 > - Router/server will find alternative paths which are not necessarily the shortest (most direct), but they are usually the quickest

 **IP ADDRESS**
 > - A unique address assigned to a server/router that serves as a "shipping label"
 > - Unreliable (but think of the redundancy concept)
 > - IP: Internet Protocol

**WEB CERTIFICATES**
> - Caddy (with built in AMCE support) uses Let's Encrypt to retrieve a web certificate
> - ssh -i [key pair file] ubuntu@[yourdomainnamehere]
> - The secure version of HTTP is called Secure Hypertext Transport Protocol (HTTPS). This is basically HTTP with a negotiated secure connection that happens before any data is exchanged. Having a secure connection means that all the data is encrypted using the TLS protocol. TLS is sometimes referred to by a now unsecure predecessor protocol named SSL. TLS works by negotiating a shared secret that is then used to encrypt data. You can see the actual negotiation that happens by using the console browser based application curl, along with the -v parameter to see the verbose output of the HTTPS exchange.
>
**HTML**
```html
<body>
  <p>Body</p>
  <header>
    <p>Header - <span>Span</span></p>
    <nav>
      Navigation
      <div>Div</div>
      <div>Div</div>
    </nav>
  </header>

  <main>
    <section>
      <p>Section</p>
      <ul>
        <li>List</li>
        <li>List</li>
        <li>List</li>
      </ul>
    </section>
    <section>
      <p>Section</p>
      <table>
        <tr>
          <th>Table</th>
          <th>Table</th>
          <th>Table</th>
        </tr>
        <tr>
          <td>table</td>
          <td>table</td>
          <td>table</td>
        </tr>
      </table>
    </section>
    <aside>
      <p>Aside</p>
    </aside>
  </main>

  <footer>
    <div>Footer - <span>Span</span></div>
  </footer>
</body>
```

If we rendered this HTML, and added just a bit of styling, so we can see how they related to each other, we would see the following.

<<<<<<< HEAD
![HTML structure](/images/htmlStructure.jpg)
=======
![HTML structure](https://github.com/piperin1/startup/blob/main/images/htmlStructure.jpg)
>>>>>>> refs/remotes/origin/main
 
