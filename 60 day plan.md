# 🎯 60-Day SDE Interview Preparation Plan

> **Start Date: Wednesday, May 20, 2026** `6 hrs/day` · `2 hrs DSA + 4 hrs Theory` · `2 LeetCode problems/day`

---

## 📊 Plan Structure

```
Phase 1 ── Days 01–30 ── OOPs → DBMS/SQL → OS → CN + Arrays/Stack/LinkedList DSA
Phase 2 ── Days 31–60 ── Behavioural (3 days) + Advanced DSA (Trees/Graphs/DP/etc.)
```

|Phase|Days|Theory|DSA Patterns|
|---|---|---|---|
|**Phase 1**|1–30|OOPs → DBMS → OS → CN → Dev Stack|Arrays · Two Pointers · Sliding Window · Stack · Linked List|
|**Phase 2**|31–33|Behavioural + Job Prep|—|
|**Phase 2**|34–60|—|Trees · Heap · Graphs · Backtracking · DP · Greedy · Bit Manipulation|

---

## 🔁 Daily Template

|Time|Hours|Activity|
|---|---|---|
|Morning|2 hrs|DSA — 2 LeetCode problems|
|Mid|2 hrs|Theory Block|
|Evening|2 hrs|Theory continued + Obsidian notes|

---

# 📘 PHASE 1 — Days 1–30

---

## 💻 OOPs — Days 1–3

> 📹 **Java:** [OOPs in Java — Kunal Kushwaha](https://www.youtube.com/watch?v=BSVKUk58K6U) 📹 **Python:** [OOPs in Python — Tech With Tim](https://www.youtube.com/watch?v=JeznW_7DlB0)

---

### DAY 1 — Wed May 20

**Theory: Programming Basics + Time & Space Complexity + OOPs Intro**

|Topic|Key Concepts|
|---|---|
|Programming Basics|Variables, data types, control flow, functions, recursion|
|Time Complexity|Big O — O(1), O(log n), O(n), O(n log n), O(n²) · Best/Avg/Worst case|
|Space Complexity|Auxiliary space, input space, recursion stack|
|OOPs Intro|Class vs Object, Blueprint vs Instance, `__init__` / constructors|

**DSA Pattern: Arrays**

|#|Problem|Link|Difficulty|
|---|---|---|---|
|1|Two Sum|[LC #1](https://leetcode.com/problems/two-sum/)|🟢 Easy|
|2|Contains Duplicate|[LC #217](https://leetcode.com/problems/contains-duplicate/)|🟢 Easy|

**Language:** Python/Java Basics — variables, loops, functions, input/output

---

### DAY 2 — Thu May 21

**Theory: Encapsulation + Abstraction**

|Topic|Key Concepts|
|---|---|
|Encapsulation|Access modifiers (public/private/protected), getters/setters, data hiding|
|Abstraction|Abstract class vs Interface, `@abstractmethod` (Python) / `abstract` (Java)|
|`__init__` deep dive|Default args, `self`, constructor chaining|
|Python/Java Specifics|`@property` (Python) · `implements` vs `extends` (Java)|

**Interview Questions**

- [ ] What is encapsulation? Give a real-world example.
- [ ] Abstract class vs Interface — when to use which?
- [ ] Can an abstract class have a constructor?

**DSA Pattern: Arrays**

|#|Problem|Link|Difficulty|
|---|---|---|---|
|1|Best Time to Buy and Sell Stock|[LC #121](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)|🟢 Easy|
|2|Valid Anagram|[LC #242](https://leetcode.com/problems/valid-anagram/)|🟢 Easy|

---

### DAY 3 — Fri May 22

**Theory: Inheritance + Polymorphism + SOLID Basics**

|Topic|Key Concepts|
|---|---|
|Inheritance|Single, Multiple, Multilevel, Hierarchical, `super()`, MRO (Python)|
|Polymorphism|Compile-time (overloading) vs Runtime (overriding), method resolution order|
|SOLID|SRP, OCP, LSP, ISP, DIP — one example each|
|Design Patterns|Singleton, Factory, Observer (conceptual overview)|
|Memory|Stack vs Heap, Garbage Collection (Java GC / Python ref counting)|

**Interview Questions**

- [ ] What are the 4 pillars of OOP?
- [ ] What is method overriding vs overloading?
- [ ] What is SOLID? Explain SRP with an example.
- [ ] What is the Singleton pattern?
- [ ] Composition vs Inheritance — pros/cons?

**DSA Pattern: Arrays — Hashing**

|#|Problem|Link|Difficulty|
|---|---|---|---|
|1|Group Anagrams|[LC #49](https://leetcode.com/problems/group-anagrams/)|🟡 Medium|
|2|Top K Frequent Elements|[LC #347](https://leetcode.com/problems/top-k-frequent-elements/)|🟡 Medium|

---

## 🗄️ DBMS & SQL — Days 4–8

> 📹 **Video:** [Gate Smashers — DBMS Playlist](https://www.youtube.com/playlist?list=PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y)

---

### DAY 4 — Sat May 23

**Theory: ER Model + Relational Model + Keys**

|Topic|Key Concepts|
|---|---|
|ER Model|Entity, Attribute types (simple/composite/multivalued/derived), Relationship, Cardinality (1:1, 1:N, M:N)|
|Keys|Primary, Foreign, Candidate, Super, Composite, Surrogate, Alternate|
|Relational Model|Tables, Tuples, Domains, Referential Integrity, Entity Integrity|
|ER to Relational|How ER diagrams map to tables|

**Interview Questions**

- [ ] What is a primary key vs foreign key?
- [ ] What is a candidate key?
- [ ] Explain ER diagram with a real-world example (e.g. Student-Course).
- [ ] What is referential integrity?

**DSA Pattern: Arrays — Prefix Sum**

|#|Problem|Link|Difficulty|
|---|---|---|---|
|1|Product of Array Except Self|[LC #238](https://leetcode.com/problems/product-of-array-except-self/)|🟡 Medium|
|2|Maximum Subarray (Kadane's)|[LC #53](https://leetcode.com/problems/maximum-subarray/)|🟡 Medium|

---

### DAY 5 — Sun May 24

**Theory: SQL Essentials**

```sql
-- Master these fully today
SELECT, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT, OFFSET
DISTINCT, AS (aliases)
INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN
SELF JOIN, CROSS JOIN
Subqueries — WHERE (col IN (SELECT ...))
UNION vs UNION ALL
EXISTS vs IN
```

**Practice Queries:**
resources :
https://www.sql-practice.com/
https://leetcode.com/studyplan/top-sql-50/
https://www.hackerrank.com/domains/sql

```sql
-- Find 2nd highest salary
SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);

-- Count employees per department
SELECT dept, COUNT(*) FROM employees GROUP BY dept HAVING COUNT(*) > 5;

-- Employees with no manager (LEFT JOIN example)
SELECT e.name FROM employees e LEFT JOIN employees m ON e.manager_id = m.id WHERE m.id IS NULL;
```

**Interview Questions**

- [ ] Difference between WHERE and HAVING?
- [ ] UNION vs UNION ALL?
- [ ] When would you use a SELF JOIN?
- [ ] What is a correlated subquery?

**DSA Pattern: Two Pointers**

|#|Problem|Link|Difficulty|
|---|---|---|---|
|1|Valid Palindrome|[LC #125](https://leetcode.com/problems/valid-palindrome/)|🟢 Easy|
|2|Two Sum II — Sorted Array|[LC #167](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)|🟡 Medium|

---

### DAY 6 — Mon May 25

**Theory: Advanced SQL — Window Functions + Indexes**

|Topic|Key Concepts|
|---|---|
|Window Functions|`ROW_NUMBER()`, `RANK()`, `DENSE_RANK()`, `LEAD()`, `LAG()`, `PARTITION BY`, `ORDER BY` in window|
|Indexes|B-Tree index, Hash index, Clustered vs Non-Clustered, Composite Index, Index scan vs Full table scan|
|Views|Simple View vs Materialized View, use cases|
|Stored Procedures|vs Functions, when to use|
|Triggers|`BEFORE/AFTER INSERT/UPDATE/DELETE`|

**Practice Queries:**

```sql
-- Rank employees by salary within each department
SELECT name, dept, salary,
  RANK() OVER (PARTITION BY dept ORDER BY salary DESC) as rnk
FROM employees;

-- Running total
SELECT date, amount,
  SUM(amount) OVER (ORDER BY date) as running_total
FROM sales;
```

**Interview Questions**

- [ ] What is an index? How does it speed up queries?
- [ ] Clustered vs non-clustered index?
- [ ] What are window functions? Give an example.
- [ ] Write a query to find the Nth highest salary using ROW_NUMBER().

**DSA Pattern: Two Pointers**

|#|Problem|Link|Difficulty|
|---|---|---|---|
|1|3Sum|[LC #15](https://leetcode.com/problems/3sum/)|🟡 Medium|
|2|Container With Most Water|[LC #11](https://leetcode.com/problems/container-with-most-water/)|🟡 Medium|

---

### DAY 7 — Tue May 26

**Theory: Normalization + Transactions + ACID**

|Topic|Key Concepts|
|---|---|
|Normalization|1NF (atomic) → 2NF (no partial dep) → 3NF (no transitive dep) → BCNF, Denormalization|
|ACID|Atomicity, Consistency, Isolation, Durability — examples for each|
|Transactions|`BEGIN`, `COMMIT`, `ROLLBACK`, `SAVEPOINT`|
|Isolation Levels|Read Uncommitted → Read Committed → Repeatable Read → Serializable|
|Concurrency Issues|Dirty Read, Non-Repeatable Read, Phantom Read|

**Interview Questions**

- [ ] What is normalization? Why is it needed?
- [ ] Explain ACID properties with examples.
- [ ] What is a dirty read?
- [ ] Which isolation level prevents phantom reads?
- [ ] When would you denormalize a database?

**DSA Pattern: Sliding Window**

|#|Problem|Link|Difficulty|
|---|---|---|---|
|1|Best Time to Buy Stock II|[LC #122](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/)|🟡 Medium|
|2|Longest Substring Without Repeating Characters|[LC #3](https://leetcode.com/problems/longest-substring-without-repeating-characters/)|🟡 Medium|

---

### DAY 8 — Wed May 27

**Theory: NoSQL + Query Optimization + CAP Theorem**

|Topic|Key Concepts|
|---|---|
|NoSQL Types|Document (MongoDB), Key-Value (Redis), Column (Cassandra), Graph (Neo4j)|
|SQL vs NoSQL|Structured vs flexible schema, ACID vs BASE, when to choose|
|CAP Theorem|Consistency, Availability, Partition Tolerance — pick 2, examples (Cassandra=AP, HBase=CP)|
|Sharding|Horizontal partitioning, shard key, pros/cons|
|Replication|Master-slave, read replicas, sync vs async|
|Query Optimization|`EXPLAIN`, avoid N+1, use index columns in WHERE, pagination with LIMIT+OFFSET|

**Interview Questions**

- [ ] SQL vs NoSQL — when would you pick each?
- [ ] What is CAP theorem? Give examples of databases for each category.
- [ ] What is sharding?
- [ ] How do you optimize a slow query?

**DSA Pattern: Sliding Window**

|#|Problem|Link|Difficulty|
|---|---|---|---|
|1|Permutation in String|[LC #567](https://leetcode.com/problems/permutation-in-string/)|🟡 Medium|
|2|Minimum Window Substring|[LC #76](https://leetcode.com/problems/minimum-window-substring/)|🔴 Hard|

---

## ⚙️ Operating Systems — Days 9–11

> 📹 **Video:** [Neso Academy — OS Playlist](https://www.youtube.com/playlist?list=PLBlnK6fEyqRiVhbXDGLXDk_OQAeuVcp2O)
> [gate smashers](https://www.youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p)

---

### DAY 9 — Thu May 28

**Theory: Processes + Threads + Scheduling**

|Topic|Key Concepts|
|---|---|
|Process vs Thread|PCB, TLB, Context Switch cost, user vs kernel threads|
|Process States|New → Ready → Running → Waiting → Terminated|
|IPC|Pipes, Message Queues, Shared Memory, Signals|
|CPU Scheduling|FCFS, SJF (Preemptive/Non), Round Robin, Priority scheduling, MLFQ|
|Scheduling Metrics|Turnaround time, waiting time, response time, throughput|

**Interview Questions**

- [ ] Process vs thread — key differences?
- [ ] What is context switching?
- [ ] Explain Round Robin scheduling with an example.
- [ ] What is starvation? How does aging solve it?

**DSA Pattern: Stack**

|#|Problem|Link|Difficulty|
|---|---|---|---|
|1|Valid Parentheses|[LC #20](https://leetcode.com/problems/valid-parentheses/)|🟢 Easy|
|2|Min Stack|[LC #155](https://leetcode.com/problems/min-stack/)|🟡 Medium|

---

### DAY 10 — Fri May 29

**Theory: Synchronization + Deadlock**

|Topic|Key Concepts|
|---|---|
|Synchronization|Race Condition, Critical Section, Mutex, Semaphore (counting vs binary), Monitors|
|Classic Problems|Producers-Consumer, Reader-Writer, Dining Philosophers|
|Deadlock|4 Conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait|
|Deadlock Handling|Prevention, Avoidance (Banker's Algorithm), Detection, Recovery|

**Interview Questions**

- [ ] Mutex vs Semaphore?
- [ ] What are the 4 conditions for deadlock?
- [ ] How does Banker's Algorithm work?
- [ ] Deadlock vs Livelock vs Starvation?

**DSA Pattern: Stack**

|#|Problem|Link|Difficulty|
|---|---|---|---|
|1|Evaluate Reverse Polish Notation|[LC #150](https://leetcode.com/problems/evaluate-reverse-polish-notation/)|🟡 Medium|
|2|Daily Temperatures|[LC #739](https://leetcode.com/problems/daily-temperatures/)|🟡 Medium|

---

### DAY 11 — Sat May 30

**Theory: Memory Management + File Systems**

|Topic|Key Concepts|
|---|---|
|Memory|Paging, Segmentation, Page Table, Multi-level Page Table, TLB|
|Virtual Memory|Demand Paging, Page Fault handling, Page Replacement (LRU, FIFO, Optimal)|
|Thrashing|Working Set Model, how to detect and prevent|
|File Systems|FAT32, NTFS, ext4, Inodes, File descriptors, Hard link vs Soft link|

**Interview Questions**

- [ ] What is virtual memory?
- [ ] Paging vs segmentation?
- [ ] What is thrashing?
- [ ] LRU page replacement — how does it work?
- [ ] What is an inode?

**DSA Pattern: Stack — Monotonic**

|#|Problem|Link|Difficulty|
|---|---|---|---|
|1|Generate Parentheses|[LC #22](https://leetcode.com/problems/generate-parentheses/)|🟡 Medium|
|2|Car Fleet|[LC #853](https://leetcode.com/problems/car-fleet/)|🟡 Medium|

---

## 🌐 Computer Networks — Days 12–14

> 📹 **Video:** [Gate Smashers — CN Playlist](https://www.youtube.com/playlist?list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_)
> [one shot revision- kunal kushwaha](https://www.youtube.com/watch?v=IPvYjXCsTg8)

---

### DAY 12 — Sun May 31

**Theory: OSI + TCP/IP + Transport Layer**

|Topic|Key Concepts|
|---|---|
|OSI 7 Layers|Physical → Data Link → Network → Transport → Session → Presentation → Application (PDU at each)|
|TCP/IP 4 Layers|Network Access, Internet, Transport, Application|
|TCP|3-way handshake (SYN→SYN-ACK→ACK), 4-way termination, flow control (sliding window), congestion control (slow start)|
|UDP|Connectionless, no guarantee, use cases: DNS, streaming, gaming, VoIP|

**Interview Questions**

- [ ] Explain OSI model with an example at each layer.
- [ ] TCP vs UDP — when to use which?
- [ ] Explain TCP 3-way handshake step by step.
- [ ] What is congestion control?

**DSA Pattern: Linked List**

|#|Problem|Link|Difficulty|
|---|---|---|---|
|1|Reverse Linked List|[LC #206](https://leetcode.com/problems/reverse-linked-list/)|🟢 Easy|
|2|Merge Two Sorted Lists|[LC #21](https://leetcode.com/problems/merge-two-sorted-lists/)|🟢 Easy|

---

### DAY 13 — Mon Jun 1

**Theory: Network Layer + DNS + HTTP**

|Topic|Key Concepts|
|---|---|
|IP|IPv4 vs IPv6, Subnetting, CIDR notation (e.g. 192.168.1.0/24)|
|Routing|Static vs Dynamic, RIP, OSPF, BGP overview|
|DNS|Resolution steps: Browser cache → OS cache → Recursive resolver → Root NS → TLD NS → Authoritative NS|
|HTTP|Methods (GET/POST/PUT/PATCH/DELETE), status codes (2xx/3xx/4xx/5xx)|
|HTTPS|TLS handshake, certificates, Certificate Authority|

**Interview Questions**

- [ ] **What happens when you type google.com?** _(Most asked — know every step)_
- [ ] DNS resolution — step by step?
- [ ] HTTP vs HTTPS?
- [ ] HTTP/1.1 vs HTTP/2 differences?
- [ ] What are common HTTP status codes?

**DSA Pattern: Linked List**

|#|Problem|Link|Difficulty|
|---|---|---|---|
|1|Linked List Cycle|[LC #141](https://leetcode.com/problems/linked-list-cycle/)|🟢 Easy|
|2|Reorder List|[LC #143](https://leetcode.com/problems/reorder-list/)|🟡 Medium|

---

### DAY 14 — Tue Jun 2

**Theory: Application Layer + Security + Modern Web**

|Topic|Key Concepts|
|---|---|
|REST|Stateless, resource-based URLs, methods, REST vs GraphQL vs gRPC|
|Auth|JWT structure (header.payload.signature), OAuth 2.0 flow, Cookies vs Sessions|
|Security|SSL/TLS, CORS, CSRF, XSS basics|
|Infrastructure|CDN, Load Balancer (L4 vs L7), Reverse Proxy, NAT, Firewall|
|WebSockets|vs HTTP polling, use cases (chat, live data)|

**Interview Questions**

- [ ] JWT vs Session-based auth?
- [ ] What is CORS? Why does it exist?
- [ ] What is a CDN?
- [ ] REST vs GraphQL — when to choose?
- [ ] What is a reverse proxy?

**DSA Pattern: Linked List**

|#|Problem|Link|Difficulty|
|---|---|---|---|
|1|Remove Nth Node From End|[LC #19](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)|🟡 Medium|
|2|Find the Duplicate Number|[LC #287](https://leetcode.com/problems/find-the-duplicate-number/)|🟡 Medium|

---

## 🛠️ Dev Stack — Days 15–28

---

### DAY 15 — Wed Jun 3

**Theory: Git & GitHub**

> 📹 [Git & GitHub — Code With Mosh (1hr)](https://www.youtube.com/watch?v=8JJ101D3knE)

|Topic|Commands|
|---|---|
|Basics|`init`, `clone`, `status`, `add`, `commit`, `log`, `diff`|
|Branching|`branch`, `checkout -b`, `merge`, `rebase`|
|Remote|`push`, `pull`, `fetch`, `remote add origin`|
|Advanced|`stash`, `cherry-pick`, `reset --soft/--hard`, `revert`, `reflog`|
|Collaboration|PRs, code reviews, `.gitignore`, `git blame`, `git bisect`|

**Interview Questions**

- [ ] `git merge` vs `git rebase`?
- [ ] `git reset` vs `git revert`?
- [ ] How do you resolve a merge conflict?
- [ ] What is `git stash`?

**DSA Pattern: Linked List — Hard**

|#|Problem|Link|Difficulty|
|---|---|---|---|
|1|LRU Cache|[LC #146](https://leetcode.com/problems/lru-cache/)|🟡 Medium|
|2|Merge K Sorted Lists|[LC #23](https://leetcode.com/problems/merge-k-sorted-lists/)|🔴 Hard|

---

### DAY 16 — Thu Jun 4

**Theory: HTML + CSS**

> 📹 [HTML & CSS — Code With Mosh (1hr)](https://www.youtube.com/watch?v=qz0aGYrrlhU)

|Topic|Key Concepts|
|---|---|
|HTML Semantics|`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<figure>`|
|Forms|Input types, `required`, `pattern`, `<label>`, `<fieldset>`|
|CSS Basics|Box model, specificity, cascading, units (px, em, rem, %, vw/vh)|
|Flexbox|`display:flex`, `justify-content`, `align-items`, `flex-wrap`, `flex-grow`|
|Grid|`display:grid`, `grid-template-columns`, `gap`, `grid-area`, `auto-fit/minmax`|
|Responsive|Media queries, mobile-first, breakpoints|

**DSA Pattern: Binary Search**

|#|Problem|Link|Difficulty|
|---|---|---|---|
|1|Binary Search|[LC #704](https://leetcode.com/problems/binary-search/)|🟢 Easy|
|2|Search a 2D Matrix|[LC #74](https://leetcode.com/problems/search-a-2d-matrix/)|🟡 Medium|

---

### DAY 17 — Fri Jun 5

**Theory: JavaScript Core**

> 📹 [JavaScript — Code With Mosh (1hr)](https://www.youtube.com/watch?v=W6NZfCO5SIk)

|Topic|Key Concepts|
|---|---|
|ES6+|`let`/`const`, arrow functions, destructuring, spread/rest, template literals, optional chaining|
|Async|Callbacks → Promises → `async/await`, Event Loop, Call Stack, Microtask Queue|
|DOM|`querySelector`, `addEventListener`, `innerHTML`, `fetch` API|
|Closures|Lexical scoping, IIFE, practical closure uses|
|`this`|Regular fn vs arrow fn, `bind`/`call`/`apply`|
|Prototypes|`prototype`, `__proto__`, class syntax sugar|

**Interview Questions**

- [ ] Explain event loop in JS.
- [ ] `var` vs `let` vs `const`?
- [ ] What is a closure?
- [ ] What is hoisting?
- [ ] `==` vs `===`?

**DSA Pattern: Binary Search**

|#|Problem|Link|Difficulty|
|---|---|---|---|
|1|Koko Eating Bananas|[LC #875](https://leetcode.com/problems/koko-eating-bananas/)|🟡 Medium|
|2|Find Minimum in Rotated Sorted Array|[LC #153](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)|🟡 Medium|

---

### DAY 18 — Sat Jun 6

**Theory: React Fundamentals**

> 📹 [React — Code With Mosh (1hr)](https://www.youtube.com/watch?v=Ke90Tje7VS0)

|Topic|Key Concepts|
|---|---|
|Components|Functional components, JSX, props, children, prop types|
|Hooks|`useState`, `useEffect`, `useRef`, `useContext`, `useMemo`, `useCallback`|
|State|Local state, lifting state up, prop drilling problem|
|Lifecycle|Mount/Update/Unmount via `useEffect` dependencies|
|Routing|React Router v6 — `<Routes>`, `<Route>`, `useNavigate`, `useParams`|

**DSA Pattern: Binary Search**

|#|Problem|Link|Difficulty|
|---|---|---|---|
|1|Search in Rotated Sorted Array|[LC #33](https://leetcode.com/problems/search-in-rotated-sorted-array/)|🟡 Medium|
|2|Time Based Key-Value Store|[LC #981](https://leetcode.com/problems/time-based-key-value-store/)|🟡 Medium|

---

### DAY 19 — Sun Jun 7

**🛠️ Build: React Project**

> Build a CRUD app (Todo List / Notes App) in React
> 
> - `useState` for local state
> - `useEffect` to load from localStorage
> - React Router for navigation
> - Deploy to **Vercel** (free, 5 min)

**DSA Pattern: Mixed Review**

|#|Problem|Link|Difficulty|
|---|---|---|---|
|1|Trapping Rain Water|[LC #42](https://leetcode.com/problems/trapping-rain-water/)|🔴 Hard|
|2|Median of Two Sorted Arrays|[LC #4](https://leetcode.com/problems/median-of-two-sorted-arrays/)|🔴 Hard|

---

### DAY 20 — Mon Jun 8

**Theory: Node.js Core**

> 📹 [Node.js — Code With Mosh (1hr)](https://www.youtube.com/watch?v=TlB_eWDSMt4)

|Topic|Key Concepts|
|---|---|
|Node Basics|`require`, `module.exports`, `process`, `__dirname`, `__filename`|
|Built-in Modules|`fs`, `path`, `http`, `os`, `events`, `crypto`|
|NPM|`package.json`, `package-lock.json`, `npm init`, `npm install`, `dotenv`|
|Async in Node|Callbacks, promises, `async/await`, streams, buffers, EventEmitter|
|Node Event Loop|Phases: timers → I/O → idle → poll → check → close|

**DSA Pattern: Heap / Priority Queue**

|#|Problem|Link|Difficulty|
|---|---|---|---|
|1|Kth Largest Element in Array|[LC #215](https://leetcode.com/problems/kth-largest-element-in-an-array/)|🟡 Medium|
|2|K Closest Points to Origin|[LC #973](https://leetcode.com/problems/k-closest-points-to-origin/)|🟡 Medium|

---

### DAY 21 — Tue Jun 9

**Theory: Express.js + REST API**

> 📹 [Express.js — Code With Mosh (1hr)](https://www.youtube.com/watch?v=pKd0Rpw7O48)

|Topic|Key Concepts|
|---|---|
|Express Setup|`app.get/post/put/patch/delete`, `req`, `res`, `next`|
|Middleware|Custom middleware, `express.json()`, `cors`, `morgan`, `helmet`|
|Routing|Express Router, route params (`:id`), query params (`?key=val`)|
|Error Handling|Global error middleware, `try/catch`, `next(err)` pattern|
|Auth Middleware|JWT verify middleware, role-based access control|

**DSA Pattern: Heap**

|#|Problem|Link|Difficulty|
|---|---|---|---|
|1|Task Scheduler|[LC #621](https://leetcode.com/problems/task-scheduler/)|🟡 Medium|
|2|Find Median from Data Stream|[LC #295](https://leetcode.com/problems/find-median-from-data-stream/)|🔴 Hard|

---

### DAY 22 — Wed Jun 10

**Theory: MongoDB + Mongoose**

> 📹 [MongoDB — Code With Mosh (1hr)](https://www.youtube.com/watch?v=_7UQPve99r4)

|Topic|Key Concepts|
|---|---|
|MongoDB Basics|Collections, Documents, BSON, CRUD, ObjectId|
|Mongoose|Schema, Model, `find`, `findById`, `findOneAndUpdate`, `save`, `populate`|
|Relationships|Embedded (denormalized) vs Referenced (normalized) documents|
|Aggregation|`$match`, `$group`, `$project`, `$lookup`, `$unwind` pipeline|
|Indexing|`createIndex`, compound indexes, `explain()` in MongoDB|

**🛠️ Build:** REST API with Express + MongoDB + JWT auth

**DSA Pattern: Mixed**

|#|Problem|Link|Difficulty|
|---|---|---|---|
|1|Top K Frequent Words|[LC #692](https://leetcode.com/problems/top-k-frequent-words/)|🟡 Medium|
|2|Sliding Window Maximum|[LC #239](https://leetcode.com/problems/sliding-window-maximum/)|🔴 Hard|

---

### DAY 23 — Thu Jun 11

**Theory: React Native Basics**

> 📹 [React Native — Code With Mosh (1hr)](https://www.youtube.com/watch?v=0-S5a0eXPoc)

|Topic|Key Concepts|
|---|---|
|Setup|Expo CLI, project structure, Metro bundler|
|Core Components|`View`, `Text`, `Image`, `TextInput`, `TouchableOpacity`, `FlatList`, `ScrollView`|
|StyleSheet|`StyleSheet.create`, Flexbox in RN (column-first), no CSS units|
|Navigation|`@react-navigation/native`, Stack Navigator, Tab Navigator|

**DSA Pattern: Mixed Review**

|#|Problem|Link|Difficulty|
|---|---|---|---|
|1|Maximum Product Subarray|[LC #152](https://leetcode.com/problems/maximum-product-subarray/)|🟡 Medium|
|2|Longest Consecutive Sequence|[LC #128](https://leetcode.com/problems/longest-consecutive-sequence/)|🟡 Medium|

---

### DAY 24 — Fri Jun 12

**Theory: React Native — APIs + State + Build**

|Topic|Key Concepts|
|---|---|
|State Management|Context API in RN, Zustand (lightweight), `AsyncStorage` for persistence|
|APIs|`fetch`/`axios`, loading states, error handling in RN|
|Native Features|Camera (`expo-camera`), Location (`expo-location`)|
|Build|`expo build`, EAS Build, generating APK/IPA|

**DSA Pattern: Mixed Review**

|#|Problem|Link|Difficulty|
|---|---|---|---|
|1|3Sum Closest|[LC #16](https://leetcode.com/problems/3sum-closest/)|🟡 Medium|
|2|Sort Colors (Dutch Flag)|[LC #75](https://leetcode.com/problems/sort-colors/)|🟡 Medium|

---

### DAY 25 — Sat Jun 13

**Theory: Python / Java Deep Dive**

> 📹 **Python:** [Code With Mosh (1hr)](https://www.youtube.com/watch?v=_uQrJ0TkZlc) · **Java:** [Code With Mosh (1hr)](https://www.youtube.com/watch?v=eIrMbAQSU34)

**Python Track**

|Topic|Key Concepts|
|---|---|
|Core|List/Dict/Set/Tuple, comprehensions, generators, `*args/**kwargs`|
|OOP|`@property`, `@classmethod`, `@staticmethod`, `__str__`, `__repr__`, `__eq__`|
|Functional|`map`, `filter`, `reduce`, `lambda`, `sorted(key=...)`|
|stdlib|`collections.Counter`, `defaultdict`, `deque` · `itertools` · `heapq` · `bisect`|

**Java Track**

|Topic|Key Concepts|
|---|---|
|Collections|`ArrayList`, `HashMap`, `HashSet`, `LinkedList`, `TreeMap`, `PriorityQueue`, `ArrayDeque`|
|Streams|`stream()`, `filter()`, `map()`, `sorted()`, `collect(Collectors.toList())`|
|Strings|`StringBuilder`, `charAt`, `substring`, `split`, `toCharArray`|
|Generics|`<T>`, bounded wildcards `<? extends T>`, `<? super T>`|

**DSA Pattern: Array Hard Problems**

|#|Problem|Link|Difficulty|
|---|---|---|---|
|1|Rotate Array|[LC #189](https://leetcode.com/problems/rotate-array/)|🟡 Medium|
|2|Spiral Matrix|[LC #54](https://leetcode.com/problems/spiral-matrix/)|🟡 Medium|

---

### DAY 26 — Sun Jun 14

**Theory: System Design Basics**

> 📹 [System Design Intro — Gaurav Sen](https://www.youtube.com/watch?v=xpDnVSmNFX0)

|Topic|Key Concepts|
|---|---|
|Scalability|Vertical vs Horizontal scaling|
|Availability|Uptime, SLAs (99.9% = 8.7 hrs downtime/yr)|
|Load Balancing|Round Robin, Least Connections, Consistent Hashing|
|Caching|Redis, cache-aside, write-through, TTL, eviction policies|
|Message Queues|Kafka/RabbitMQ basics, producer-consumer, async decoupling|
|Microservices|vs Monolith, API Gateway, service discovery|

**DSA Pattern: Stack Hard**

|#|Problem|Link|Difficulty|
|---|---|---|---|
|1|Largest Rectangle in Histogram|[LC #84](https://leetcode.com/problems/largest-rectangle-in-histogram/)|🔴 Hard|
|2|Max Rectangle in Binary Matrix|[LC #85](https://leetcode.com/problems/maximal-rectangle/)|🔴 Hard|

---

### DAY 27 — Mon Jun 15

**Theory: System Design — Practice Problems**

|Design Problem|Must Cover|
|---|---|
|URL Shortener|DB schema, Base62 hashing, cache (Redis), redirect logic, rate limiting|
|Instagram Feed|CDN, fan-out on write vs read, sharding, caching, Kafka for async|
|Chat App|WebSockets, presence service, message storage, group chat|

**DSA Pattern: Mixed Review — Most Asked**

|#|Problem|Link|Difficulty|
|---|---|---|---|
|1|Set Matrix Zeroes|[LC #73](https://leetcode.com/problems/set-matrix-zeroes/)|🟡 Medium|
|2|Word Search|[LC #79](https://leetcode.com/problems/word-search/)|🟡 Medium|

---

### DAY 28 — Tue Jun 16

**Theory: Aptitude + Logical Reasoning Quick Prep**

|Topic|Key Areas|
|---|---|
|Quantitative|Percentages, Profit/Loss, Time-Speed-Distance, Ratio, Probability|
|Logical|Number series, Syllogisms, Blood relations, Coding-Decoding|
|Verbal|Reading comprehension, Sentence correction, Para jumbles|

> 📹 [IndiaBix Aptitude Practice](https://www.indiabix.com/) · [PrepInsta](https://prepinsta.com/aptitude/)

**DSA Pattern: Linked List Hard**

|#|Problem|Link|Difficulty|
|---|---|---|---|
|1|Reverse Nodes in K-Group|[LC #25](https://leetcode.com/problems/reverse-nodes-in-k-group/)|🔴 Hard|
|2|Copy List with Random Pointer|[LC #138](https://leetcode.com/problems/copy-list-with-random-pointer/)|🟡 Medium|

---

### DAY 29 — Wed Jun 17

**Theory: Resume Review + LinkedIn Polish**

|Task|Action|
|---|---|
|Resume|1 page · ATS-friendly · Quantified impact · Skills + Projects with tech stack|
|LinkedIn|Professional photo · Headline with keywords · About section · Projects with links|
|GitHub|3–4 pinned repos · README for each · Profile README · Green contribution graph|
|Projects|Make sure every project built in Phase 1 is live on GitHub|

**DSA Pattern: Mixed Review**

|#|Problem|Link|Difficulty|
|---|---|---|---|
|1|Jump Game|[LC #55](https://leetcode.com/problems/jump-game/)|🟡 Medium|
|2|Jump Game II|[LC #45](https://leetcode.com/problems/jump-game-ii/)|🟡 Medium|

---

### DAY 30 — Thu Jun 18

**🔁 Phase 1 Full Review**

|Subject|Revise|
|---|---|
|OOPs|4 pillars, SOLID, Singleton, abstract vs interface|
|DBMS|Normalization, ACID, window functions, CAP theorem|
|OS|Deadlock, scheduling, paging, virtual memory|
|CN|OSI, TCP handshake, "what happens when you type a URL", JWT|

**DSA: Phase 1 Missed Problems**

|#|Problem|Link|Difficulty|
|---|---|---|---|
|1|Encode and Decode Strings|[LC #271](https://leetcode.com/problems/encode-and-decode-strings/)|🟡 Medium|
|2|Largest Rectangle in Histogram|[LC #84](https://leetcode.com/problems/largest-rectangle-in-histogram/)|🔴 Hard|

---

# 🚀 PHASE 2 — Days 31–60

---

## 🎤 Behavioural Prep — Days 31–33

> **Goal:** Be fully job-application ready before the DSA sprint.

### 📹 3 Must-Watch Videos

|#|Video|Link|
|---|---|---|
|1|Self Introduction Masterclass|[Jeff H Sipe — Tell Me About Yourself](https://www.youtube.com/watch?v=kayOhGRcNt4)|
|2|STAR Method for Behavioural|[Self Made Millennial](https://www.youtube.com/watch?v=CCqBkPvmEDI)|
|3|LinkedIn + Job Application Strategy|[Jeff Su — LinkedIn Tips](https://www.youtube.com/watch?v=BcfGWi8F6t4)|

---

### DAY 31 — Fri Jun 19

> 🎥 Watch Video 1 · Write + record your self intro · Create STAR bank

**Self Intro Template (90 seconds)**

```
"Hi, I'm [Name]. I'm a [final year / recent grad] in [Branch] from [College].
I'm passionate about [backend / full-stack / mobile dev].
I built [Project 1] using [tech stack] which [impact].
I also worked on [Project 2] that [result].
I'm looking for a role where I can [goal].
Most comfortable with [your stack]."
```

---

### DAY 32 — Sat Jun 20

> 🎥 Watch Video 2 · Answer all 20 HR questions using STAR

**Top 20 HR Questions**

- [ ] Tell me about yourself
- [ ] Why this company?
- [ ] Biggest strength / weakness
- [ ] Tell me a time you failed
- [ ] Tell me a time you led a team
- [ ] How do you handle conflict?
- [ ] Why should we hire you?
- [ ] Where do you see yourself in 5 years?
- [ ] Describe a challenging project
- [ ] What is your proudest achievement?
- [ ] How do you prioritize tasks?
- [ ] Describe a time you worked under pressure
- [ ] Tell me about a time you disagreed with a decision
- [ ] What motivates you?
- [ ] How do you handle feedback?

---

### DAY 33 — Sun Jun 21

> 🎥 Watch Video 3 · Final LinkedIn + GitHub + Resume polish · Apply to 10 companies

---

## 💡 DSA Deep Dive — Days 34–60

> 6 hrs/day · 3–4 problems/day · All advanced patterns

---

### Days 34–36 — Trees + BST

|Day|Problems|Links|
|---|---|---|
|**Day 34**|Invert Binary Tree · Max Depth of BT|[LC #226](https://leetcode.com/problems/invert-binary-tree/) · [LC #104](https://leetcode.com/problems/maximum-depth-of-binary-tree/)|
||Diameter of Binary Tree · Balanced Binary Tree|[LC #543](https://leetcode.com/problems/diameter-of-binary-tree/) · [LC #110](https://leetcode.com/problems/balanced-binary-tree/)|
|**Day 35**|Level Order Traversal · Right Side View|[LC #102](https://leetcode.com/problems/binary-tree-level-order-traversal/) · [LC #199](https://leetcode.com/problems/binary-tree-right-side-view/)|
||Count Good Nodes · LCA of BT|[LC #1448](https://leetcode.com/problems/count-good-nodes-in-binary-tree/) · [LC #236](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)|
|**Day 36**|Validate BST · Kth Smallest in BST|[LC #98](https://leetcode.com/problems/validate-binary-search-tree/) · [LC #230](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)|
||BST to Greater Sum Tree · Construct BT from PreOrder+InOrder|[LC #538](https://leetcode.com/problems/convert-bst-to-greater-tree/) · [LC #105](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)|

---

### Days 37–38 — Trees Hard + Tries

|Day|Problems|Links|
|---|---|---|
|**Day 37**|Binary Tree Max Path Sum · Serialize & Deserialize BT|[LC #124](https://leetcode.com/problems/binary-tree-maximum-path-sum/) · [LC #297](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/)|
|**Day 38**|Implement Trie · Design Add and Search Words|[LC #208](https://leetcode.com/problems/implement-trie-prefix-tree/) · [LC #211](https://leetcode.com/problems/design-add-and-search-words-data-structure/)|
||Word Search II (Trie + Backtracking)|[LC #212](https://leetcode.com/problems/word-search-ii/)|

---

### Days 39–41 — Backtracking

|Day|Problems|Links|
|---|---|---|
|**Day 39**|Subsets · Subsets II|[LC #78](https://leetcode.com/problems/subsets/) · [LC #90](https://leetcode.com/problems/subsets-ii/)|
||Combination Sum|[LC #39](https://leetcode.com/problems/combination-sum/)|
|**Day 40**|Combination Sum II · Permutations|[LC #40](https://leetcode.com/problems/combination-sum-ii/) · [LC #46](https://leetcode.com/problems/permutations/)|
||Permutations II|[LC #47](https://leetcode.com/problems/permutations-ii/)|
|**Day 41**|Palindrome Partitioning · Letter Combinations|[LC #131](https://leetcode.com/problems/palindrome-partitioning/) · [LC #17](https://leetcode.com/problems/letter-combinations-of-a-phone-number/)|
||N-Queens|[LC #51](https://leetcode.com/problems/n-queens/)|

> 🔑 **Pattern:** `choose → explore → unchoose` — always draw the decision tree first

---

### Days 42–44 — Graphs

|Day|Topic|Problems|Links|
|---|---|---|---|
|**Day 42**|BFS/DFS|Number of Islands · Clone Graph|[LC #200](https://leetcode.com/problems/number-of-islands/) · [LC #133](https://leetcode.com/problems/clone-graph/)|
|||Max Area of Island · Pacific Atlantic|[LC #695](https://leetcode.com/problems/max-area-of-island/) · [LC #417](https://leetcode.com/problems/pacific-atlantic-water-flow/)|
|**Day 43**|Topological Sort|Course Schedule · Course Schedule II|[LC #207](https://leetcode.com/problems/course-schedule/) · [LC #210](https://leetcode.com/problems/course-schedule-ii/)|
||Union Find|Redundant Connection · Number of Connected Components|[LC #684](https://leetcode.com/problems/redundant-connection/) · [LC #323](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/)|
|**Day 44**|Dijkstra|Network Delay Time · Cheapest Flights K Stops|[LC #743](https://leetcode.com/problems/network-delay-time/) · [LC #787](https://leetcode.com/problems/cheapest-flights-within-k-stops/)|
||Hard|Word Ladder · Alien Dictionary|[LC #127](https://leetcode.com/problems/word-ladder/) · [LC #269](https://leetcode.com/problems/alien-dictionary/)|

---

### Days 45–48 — Dynamic Programming

|Day|Pattern|Problems|Links|
|---|---|---|---|
|**Day 45**|1D DP|Climbing Stairs · House Robber|[LC #70](https://leetcode.com/problems/climbing-stairs/) · [LC #198](https://leetcode.com/problems/house-robber/)|
|||House Robber II · Decode Ways|[LC #213](https://leetcode.com/problems/house-robber-ii/) · [LC #91](https://leetcode.com/problems/decode-ways/)|
|**Day 46**|2D DP|Unique Paths · Longest Common Subsequence|[LC #62](https://leetcode.com/problems/unique-paths/) · [LC #1143](https://leetcode.com/problems/longest-common-subsequence/)|
|||Edit Distance|[LC #72](https://leetcode.com/problems/edit-distance/)|
|**Day 47**|Knapsack|Coin Change · Coin Change II|[LC #322](https://leetcode.com/problems/coin-change/) · [LC #518](https://leetcode.com/problems/coin-change-ii/)|
|||Partition Equal Subset Sum · Target Sum|[LC #416](https://leetcode.com/problems/partition-equal-subset-sum/) · [LC #494](https://leetcode.com/problems/target-sum/)|
|**Day 48**|DP Hard|Word Break · Burst Balloons|[LC #139](https://leetcode.com/problems/word-break/) · [LC #312](https://leetcode.com/problems/burst-balloons/)|
|||Distinct Subsequences · Interleaving String|[LC #115](https://leetcode.com/problems/distinct-subsequences/) · [LC #97](https://leetcode.com/problems/interleaving-string/)|

---

### Days 49–50 — Greedy + Intervals

|Day|Problems|Links|
|---|---|---|
|**Day 49**|Gas Station · Hand of Straights · Merge Triplets|[LC #134](https://leetcode.com/problems/gas-station/) · [LC #846](https://leetcode.com/problems/hand-of-straights/) · [LC #1899](https://leetcode.com/problems/merge-triplets-to-form-target-triplet/)|
||Partition Labels · Valid Parenthesis String|[LC #763](https://leetcode.com/problems/partition-labels/) · [LC #678](https://leetcode.com/problems/valid-parenthesis-string/)|
|**Day 50**|Merge Intervals · Insert Interval|[LC #56](https://leetcode.com/problems/merge-intervals/) · [LC #57](https://leetcode.com/problems/insert-interval/)|
||Non-overlapping Intervals · Meeting Rooms II|[LC #435](https://leetcode.com/problems/non-overlapping-intervals/) · [LC #253](https://leetcode.com/problems/meeting-rooms-ii/)|

---

### Days 51–52 — Bit Manipulation + Math

|Day|Problems|Links|
|---|---|---|
|**Day 51**|Single Number · Number of 1 Bits · Counting Bits|[LC #136](https://leetcode.com/problems/single-number/) · [LC #191](https://leetcode.com/problems/number-of-1-bits/) · [LC #338](https://leetcode.com/problems/counting-bits/)|
||Reverse Bits · Missing Number|[LC #190](https://leetcode.com/problems/reverse-bits/) · [LC #268](https://leetcode.com/problems/missing-number/)|
|**Day 52**|Sum of Two Integers · Pow(x,n)|[LC #371](https://leetcode.com/problems/sum-of-two-integers/) · [LC #50](https://leetcode.com/problems/powx-n/)|
||Multiply Strings · Rotate Image|[LC #43](https://leetcode.com/problems/multiply-strings/) · [LC #48](https://leetcode.com/problems/rotate-image/)|

---

### Days 53–55 — Company-Tagged Hard Problems

|Day|Company|Problems|Links|
|---|---|---|---|
|**Day 53**|Google|Trapping Rain Water · Median of Two Sorted Arrays|[LC #42](https://leetcode.com/problems/trapping-rain-water/) · [LC #4](https://leetcode.com/problems/median-of-two-sorted-arrays/)|
|||Word Break II · Next Permutation|[LC #140](https://leetcode.com/problems/word-break-ii/) · [LC #31](https://leetcode.com/problems/next-permutation/)|
|**Day 54**|Amazon|LRU Cache · Design HashMap|[LC #146](https://leetcode.com/problems/lru-cache/) · [LC #706](https://leetcode.com/problems/design-hashmap/)|
|||Sliding Window Max · Find Median from Stream|[LC #239](https://leetcode.com/problems/sliding-window-maximum/) · [LC #295](https://leetcode.com/problems/find-median-from-data-stream/)|
|**Day 55**|Microsoft|Serialize/Deserialize BST · Max Points on Line|[LC #449](https://leetcode.com/problems/serialize-and-deserialize-bst/) · [LC #149](https://leetcode.com/problems/max-points-on-a-line/)|
|||Valid Number · Largest Number|[LC #65](https://leetcode.com/problems/valid-number/) · [LC #179](https://leetcode.com/problems/largest-number/)|

---

### Days 56–57 — Mock Interviews (Timed)

> ⏱️ Use [NeetCode.io Practice](https://neetcode.io/practice) or pair with a study partner

|Day|Format|
|---|---|
|**Day 56**|2 × 45-min sessions · Easy + Medium · Talk through approach BEFORE coding|
|**Day 57**|2 × 45-min sessions · Medium + Hard · Explain time & space complexity after every solution|

---

### Days 58–59 — System Design Mock

|Day|Design Problem|Must Cover|
|---|---|---|
|**Day 58**|URL Shortener|DB schema · Base62 hashing · Redis cache · Redirection · Rate limiting · Analytics|
|**Day 59**|Instagram Feed|CDN · Fan-out on write vs read · Sharding · Caching · Kafka async · Search|

---

### Day 60 — Final Review + Application Sprint

|Task|Action|
|---|---|
|📋 Pattern revision|Go through every pattern in Obsidian notes|
|🎥 Re-record self intro|Smoother delivery, under 90 seconds|
|📩 Apply to 20 companies|LinkedIn Easy Apply + company portals|
|💬 Referrals|Message 5 seniors at target companies|
|🧘 Rest|Sleep early. You're ready.|

---

## 📌 Most Repeated Interview Problems (Master List)

> ⭐ = Must-solve before any interview

|Topic|Problems|LeetCode|
|---|---|---|
|Arrays|⭐ Two Sum · ⭐ Best Time to Buy Stock · ⭐ Product Except Self · ⭐ Maximum Subarray · ⭐ Trapping Rain Water|#1 #121 #238 #53 #42|
|Strings|⭐ Longest Substring No Repeat · ⭐ Group Anagrams · ⭐ Min Window Substring · Longest Palindromic Substring|#3 #49 #76 #5|
|Linked List|⭐ Reverse LL · ⭐ Merge Two Sorted · ⭐ Detect Cycle · ⭐ LRU Cache · Merge K Sorted|#206 #21 #141 #146 #23|
|Trees|⭐ Level Order BFS · ⭐ LCA · ⭐ Validate BST · ⭐ Max Path Sum · Serialize BT|#102 #236 #98 #124 #297|
|DP|⭐ Coin Change · ⭐ LCS · ⭐ Word Break · ⭐ Edit Distance · 0/1 Knapsack|#322 #1143 #139 #72 —|
|Graphs|⭐ Number of Islands · ⭐ Course Schedule · ⭐ Dijkstra · Word Ladder · Clone Graph|#200 #207 #743 #127 #133|
|Misc|⭐ Find Median from Stream · ⭐ Top K Frequent · ⭐ Meeting Rooms II · Task Scheduler · N-Queens|#295 #347 #253 #621 #51|

---

## 📅 Quick Reference Calendar

```
Week 01  May 20–24  OOPs (3d) + DBMS start         DSA: Arrays + Two Pointers
Week 02  May 25–31  DBMS (5d total)                 DSA: Sliding Window + Stack
Week 03  Jun 01–07  OS (3d) + CN (3d) + Git         DSA: Linked List + Binary Search
Week 04  Jun 08–14  Node + React + MongoDB + RN      DSA: Heap + Mixed
Week 05  Jun 15–18  System Design + Review + Resume  DSA: Hard Problems Review
──────────────────────────────────────────────────────────────────────────────────
Week 06  Jun 19–21  BEHAVIOURAL (3d) — Self Intro + STAR + LinkedIn + Applications
Week 07  Jun 22–28  Trees + Tries + Backtracking
Week 08  Jun 29–Jul5 Graphs + DP Full Coverage
Week 09  Jul 06–12  Greedy + Bit Manip + Company Hard Questions
Week 10  Jul 13–19  Mock Interviews + System Design + Application Sprint → Day 60
```

---


> **"The best time to plant a tree was 3 years ago. The second best time is now."** Start today. Show up every day. The offers will follow. 🚀