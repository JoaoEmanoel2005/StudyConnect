import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function FeatureCard({ title, description, badge, icon: Icon, iconBgColor, iconColor, features, buttonText, buttonColor, buttonHoverColor, onClick }) {
  const idBase = title.toLowerCase().replace(/\s+/g, "-");
  return (
    <section
      className="group border border-gray-200 bg-white rounded-2xl p-8 flex flex-col gap-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      aria-labelledby={`${idBase}-title`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-16 h-16 rounded-xl ${iconBgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`h-9 w-9 ${iconColor}`} />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 id={`${idBase}-title`} className="text-xl font-semibold text-slate-800">
              {title}
            </h3>
            <span className={`px-2 py-0.5 ${badge.bgColor} ${badge.textColor} text-xs font-medium rounded`}>
              {badge.text}
            </span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Lista de Recursos */}
      <div className="space-y-2">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto">
        <button
          className={`w-full py-3 ${buttonColor} text-white rounded-lg ${buttonHoverColor} transition-all duration-300 font-medium shadow-md hover:shadow-lg`}
          onClick={onClick}
        >
          {buttonText}
        </button>
      </div>
    </section>
  );
}