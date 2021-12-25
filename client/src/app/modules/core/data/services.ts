export interface Service {
  title: string;
  content: string;
  image: string;
  isNew: boolean;
  path: string;
}

export const ServicesList = [
  {
    title: 'خدمات الأفراد',
    content:
      'توفير طاقم مؤهل من العمالة المنزلية من خلال عقود شهرية متنوعه وبنظام الساعة',
    image: 'assets/images/home/home.png',
    isNew: false,
    path: 'under-construction',
  },
  {
    title: 'قطاع الأعمال',
    image: 'assets/images/home/worker.png',
    content: 'توفير الكوادر المؤهلة من كافة المهن والتخصصات وفي مختلف المجالات',
    isNew: false,
    path: '/dashboard/lead',
  },
  {
    title: 'خدمات صيانة',
    content: 'توفير خدمات الصيانة لمنزلك من افضل مزودين الخدمات المحترفين',
    image: 'assets/images/home/tools.png',
    isNew: false,
    path: 'under-construction',
  },
  {
    title: 'خدمات الوساطة',
    content: ' نهتم بتقديم العمالة المنزلية من خلال خدمة التوسط في الاستقدام',
    image: 'assets/images/home/shake-hands.png',
    isNew: false,
    path: 'under-construction',
  },
];
