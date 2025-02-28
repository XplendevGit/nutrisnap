class ActivityService {
    constructor() {
      this.activities = [
        { name: "Yoga", icon: "self-improvement" },
        { name: "Correr", icon: "directions-run" },
        { name: "Natación", icon: "pool" },
        { name: "Fútbol", icon: "sports-soccer" },
        { name: "Ciclismo", icon: "pedal-bike" },
        { name: "Gimnasio", icon: "fitness-center" },
        { name: "Calistenia", icon: "fitness-center" },
        { name: "Baseball", icon: "sports-baseball" },
        { name: "Basketball", icon: "sports-basketball" },
        { name: "Voleibol", icon: "sports-volleyball" },
        { name: "Senderismo", icon: "hiking" },
        { name: "Patinaje", icon: "roller-skating" },
        { name: "Esquí", icon: "ac-unit" },
        { name: "Otro", icon: "help-outline" },
      ];
    }
  
    // Método para obtener todas las actividades
    getAllActivities() {
      return this.activities;
    }
  
    // Método para obtener solo los nombres de las actividades
    getActivityNames() {
      return this.activities.map((activity) => activity.name);
    }
  
    // Método para obtener el ícono de una actividad específica
    getActivityIcon(activityName) {
      const activity = this.activities.find((a) => a.name === activityName);
      return activity ? activity.icon : "help-outline";
    }
  }
  
  // Exportar una única instancia para reutilizar en toda la app
  const activityService = new ActivityService();
  export default activityService;
  