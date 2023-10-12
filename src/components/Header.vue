<script></script>

<template>
  <header class="header">
    <router-link to="/">
      <img
        src="https://i.pinimg.com/originals/21/b8/3c/21b83c2c73ef354bcb9c16a913962545.jpg"
        class="logo"
        alt="main-logo"
      />
    </router-link>

    <ul v-if="true" class="nav-list">
      <li class="nav-item">
        <router-link to="/salons" class="nav-link">
          Salons
        </router-link>
      </li>

      <li class="nav-item">
        <router-link to="/services" class="nav-link">
          Services
        </router-link>
      </li>

      <li class="nav-item">
        <router-link to="/appointments" class="nav-link">
          Appointments
        </router-link>
      </li>
    </ul>

    <button v-else>Login</button>
  </header>
</template>

<style>
.header {
  position: fixed;
  z-index: 1;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;  
  height: 60px;
  padding-inline: 24px;
  background-color: var(--danger-color);
}

.logo {
  width: 50px;
  height: 50px;
  margin-top: 5px;
  border-radius: 50%;
}

.nav-list {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
}

.nav-item {
  height: 100%;
  display: inline-block;
  transition: 0.3s;
}

.nav-item:hover {
  background-color: rgb(255, 70, 85);
}

.nav-link {
  display: inline-block;
  padding-inline: 10px;
  color: #fff;
  line-height: 60px;
  text-decoration: none;
}
</style>
